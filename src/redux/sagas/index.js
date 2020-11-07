import { takeEvery, put, all, select } from "redux-saga/effects";
import {
  SET_SELECTED_ADDRESS_IN_MEMORY,
  setAddressRowInMemory,
  setAddressColumnInMemory,
  SET_IS_RAS_CAS_ENABLED,
  setPins,
  SET_SELECTED_COL_IN_MEMORY,
  setSelectedAddressInMemory,
  toggleRasCas,
  setCurrentTacts,
  SET_CLOCK_PIN,
  SET_CURRENT_TACTS,
  SET_IS_TACTING_ENABLED,
} from "../actions";
import { PINS, PIN_STATE } from "../../helpers/consts";
import { selectSelectedRow } from "../reducers/memory.red";
import { isEmpty } from "ramda";
import { selectIsRasCasEnabled } from "../reducers/visualizationSettings.red";
import { selectTacts, selectCurrentTacts } from "../reducers/pinsInfo.red";

function* resetAddressRowAndCol(data) {
  if (!data.payload) {
    yield put(setAddressRowInMemory(""));
    yield put(setAddressColumnInMemory(""));
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

function* constructSelectedMemoryAddress(action) {
  const selectedCol = action.payload;
  const selectedRow = yield select(selectSelectedRow);
  if (!isEmpty(selectedCol) && !isEmpty(selectedRow)) {
    yield put(setSelectedAddressInMemory(`${selectedRow}${selectedCol}`));
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
    takeEvery(SET_SELECTED_ADDRESS_IN_MEMORY, resetAddressRowAndCol),
    takeEvery(SET_IS_RAS_CAS_ENABLED, enableRasCasPins),
    takeEvery(SET_IS_TACTING_ENABLED, onSetTacting),
    takeEvery(SET_SELECTED_COL_IN_MEMORY, constructSelectedMemoryAddress),
    takeEvery(SET_CLOCK_PIN, updateNumberOfTacts),
  ]);
}
