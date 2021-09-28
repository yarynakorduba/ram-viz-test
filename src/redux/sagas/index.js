import { takeEvery, put, all, select, call } from "redux-saga/effects";
import { compose } from "ramda";

import {
  setSelectedRowInMemory,
  setSelectedColInMemory,
  SET_IS_RAS_CAS_ENABLED,
  setPins,
  toggleRasCas,
  setCurrentTacts,
  SET_CLOCK_PIN,
  SET_IS_TACTING_ENABLED,
  WRITE_DATUM_IN_MEMORY,
  SET_PINS_WIDTH,
  setMemory,
  READ_DATUM_FROM_MEMORY,
  readDatumFromMemory,
} from "../actions";
import { MEMORY_STATE, PINS, PIN_STATE } from "../../helpers/consts";
import { selectIsRasCasEnabled, selectIsTactingEnabled } from "../reducers/visualizationSettings.red";
import {
  selectTacts,
  selectCurrentTacts,
  selectAddressWidth,
  selectDataWidth,
  selectEnabled,
} from "../reducers/pinsInfo.red";
import { selectMemory } from "../reducers/memory.red";

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function* onReadDatumFromMemory(action) {
  const {
    payload: { address },
  } = action;
  const memory = yield select(selectMemory);
  const dataWidth = yield select(selectDataWidth);
  const isEnabled = yield select(selectEnabled);

  if (isEnabled === MEMORY_STATE.ENABLED) yield put(setPins(PINS.DATA, memory[parseInt(address, 2)].datum));
  else put(setPins(PINS.DATA, PIN_STATE.OFF.repeat(dataWidth)));
}

function* resetAddressRowAndCol() {
  // If tacting is NOT enabled, we can write the data into the column right away.
  // This means, we do not need to erase the selected columns.
  // Otherwise, we need to erase selected rows and columns, because selection should happen
  // only after a predefined number of tacts.
  const isTactingEnabled = yield select(selectIsTactingEnabled);

  if (isTactingEnabled) {
    yield call(delay, 1000);
    yield put(setSelectedRowInMemory(undefined));
    yield put(setSelectedColInMemory(undefined));
    console.log("this happened!");
  }
}

function* onWidthChange() {
  const addressWidth = yield select(selectAddressWidth);
  const dataWidth = yield select(selectDataWidth);
  const memorizedInfo = yield select(selectMemory);

  if (addressWidth) {
    const updatedMemory = compose(
      (memory) => memory.map((memoryCell, index) => memorizedInfo[index] || memoryCell),
      (memory) =>
        memory.fill({
          isDirty: false,
          datum: PIN_STATE.OFF.repeat(dataWidth),
        })
    )(new Array(Math.pow(2, addressWidth)));
    yield put(setMemory(updatedMemory));
  }
}

function* enableRasCasPins(action) {
  if (action.payload.isEnabled) {
    const ramLatency = yield select(selectTacts);
    yield put(setPins(PINS.RAS, PIN_STATE.ON));
    yield put(setCurrentTacts(ramLatency));
  }
}

function* onSetTacting(action) {
  if (action.payload.isEnabled) {
    const ramLatency = yield select(selectTacts);
    yield put(setCurrentTacts(ramLatency));
  }
}

function* updateNumberOfTacts(action) {
  const currentTacts = yield select(selectCurrentTacts);
  const clock = action.payload;
  const isRasCasEnabled = yield select(selectIsRasCasEnabled);
  const ramLatency = yield select(selectTacts);
  if (clock === PIN_STATE.ON) {
    yield put(setCurrentTacts(currentTacts - 1));
  }
  console.log("-====currentTacts --> ", { currentTacts, clock });
  if (currentTacts === 0 && clock === PIN_STATE.OFF) {
    // Reset current tacts to ramLatency, defined by hardware producer
    yield put(setCurrentTacts(ramLatency));
    if (isRasCasEnabled) {
      // Change RAS to CAS and vice versa in case RAS/CAS is enabled and current tacts reached 0
      yield put(toggleRasCas());
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery([WRITE_DATUM_IN_MEMORY, READ_DATUM_FROM_MEMORY], resetAddressRowAndCol),
    takeEvery(READ_DATUM_FROM_MEMORY, onReadDatumFromMemory),
    takeEvery(SET_IS_RAS_CAS_ENABLED, enableRasCasPins),
    takeEvery(SET_IS_TACTING_ENABLED, onSetTacting),
    takeEvery(SET_CLOCK_PIN, updateNumberOfTacts),
    takeEvery(SET_PINS_WIDTH, onWidthChange),
  ]);
}
