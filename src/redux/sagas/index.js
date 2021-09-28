import { takeEvery, put, all, select } from "redux-saga/effects";
import {
  setSelectedRowInMemory,
  setSelectedColInMemory,
  SET_IS_RAS_CAS_ENABLED,
  setPins,
  toggleRasCas,
  setCurrentTacts,
  SET_CLOCK_PIN,
  SET_IS_TACTING_ENABLED,
  resetMemory,
  WRITE_DATUM_IN_MEMORY,
  SET_PINS_WIDTH,
} from "../actions";
import { PINS, PIN_STATE } from "../../helpers/consts";
import { selectIsRasCasEnabled, selectIsTactingEnabled } from "../reducers/visualizationSettings.red";
import { selectTacts, selectCurrentTacts, selectAddressWidth } from "../reducers/pinsInfo.red";

function* resetAddressRowAndCol(data) {
  // if tacting is not enabled, we can write the data into the column right away
  // this means, we do not need to erase the selected columns
  const isTactingEnabled = yield select(selectIsTactingEnabled);
  if (isTactingEnabled) {
    yield put(setSelectedRowInMemory(undefined));
    yield put(setSelectedColInMemory(undefined));
  }
}

function* onWidthChange() {
  const width = yield select(selectAddressWidth);
  resetMemory({ width });
}

function* enableRasCasPins(action) {
  if (action.payload.isEnabled) {
    const ramLatency = yield select(selectTacts);
    yield put(setPins(PINS.RAS, PIN_STATE.ON));
    yield put(setCurrentTacts(ramLatency));
  }
}

function* onSetTacting(action) {
  // yield call(resetAddressRowAndCol);
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
    takeEvery(WRITE_DATUM_IN_MEMORY, resetAddressRowAndCol),
    takeEvery(SET_IS_RAS_CAS_ENABLED, enableRasCasPins),
    takeEvery(SET_IS_TACTING_ENABLED, onSetTacting),
    takeEvery(SET_CLOCK_PIN, updateNumberOfTacts),
    takeEvery(SET_PINS_WIDTH, onWidthChange),
    
  ]);
}
