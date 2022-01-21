import { path, slice } from "ramda";
import {
  SET_PINS,
  SET_PINS_WIDTH,
  SET_TACTS,
  SET_CURRENT_TACTS,
  SET_RAS_PIN,
  SET_CAS_PIN,
  TOGGLE_RAS_CAS,
  SET_CLOCK_PIN,
  SET_ADDRESS_ROW_PINS,
  SET_ADDRESS_COL_PINS,
} from "../actions";
import { MEMORY_MODE, MEMORY_STATE, PIN_STATE, PINS } from "../../helpers/consts";

const initialState = {
  address: PIN_STATE.OFF.repeat(4),
  row: PIN_STATE.OFF.repeat(2),
  col: PIN_STATE.OFF.repeat(2),
  [PINS.RAS]: PIN_STATE.OFF,
  [PINS.CAS]: PIN_STATE.OFF,
  addressWidth: 4,
  data: PIN_STATE.OFF.repeat(4),
  dataWidth: 4,
  enabled: MEMORY_STATE.ENABLED,
  readWrite: MEMORY_MODE.WRITE,
  clock: PIN_STATE.OFF,
  tacts: 4,
  currentTacts: 0,
};

const pinsInfo = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_RAS_PIN:
      return {
        ...state,
        [PINS.RAS]: payload,
      };
    case SET_CAS_PIN:
      return {
        ...state,
        [PINS.CAS]: payload,
      };
    case SET_ADDRESS_ROW_PINS:
      return {
        ...state,
        row: payload,
      };
    case SET_ADDRESS_COL_PINS:
      return {
        ...state,
        col: payload,
      };
    case SET_CLOCK_PIN:
      return {
        ...state,
        [PINS.CLOCK]: payload,
      };

    case SET_PINS:
      return { ...state, [payload.type]: payload.value };

    case TOGGLE_RAS_CAS: {
      return {
        ...state,
        [PINS.RAS]: state[PINS.RAS] === PIN_STATE.ON ? PIN_STATE.OFF : PIN_STATE.ON,
        [PINS.CAS]: state[PINS.CAS] === PIN_STATE.ON ? PIN_STATE.OFF : PIN_STATE.ON,
      };
    }
    case SET_TACTS:
      return { ...state, tacts: payload, currentTacts: payload };

    case SET_CURRENT_TACTS:
      return { ...state, currentTacts: payload };

    case SET_PINS_WIDTH: {
      const { type, width } = payload;
      const updatedValue = state[type].padStart(width, "0").slice(-width);
      const update = { [type]: updatedValue, [`${type}Width`]: width };
      if (type === "address") {
        update.row = slice(0, updatedValue.length / 2, updatedValue);
        update.col = slice(updatedValue.length / 2, updatedValue.length, updatedValue);
      }
      return { ...state, ...update };
    }
    default:
      return state;
  }
};

export default pinsInfo;

export const selectData = (state) => path(["pinsInfo", "data"], state);
export const selectDataWidth = (state) => path(["pinsInfo", "dataWidth"], state);
export const selectAddressWidth = (state) => path(["pinsInfo", "addressWidth"], state);
export const selectEnabled = (state) => path(["pinsInfo", "enabled"], state);
export const selectMemoryMode = (state) => path(["pinsInfo", "readWrite"], state);
export const selectClock = (state) => path(["pinsInfo", "clock"], state);
export const selectTacts = (state) => path(["pinsInfo", "tacts"], state);
export const selectCurrentTacts = (state) => path(["pinsInfo", "currentTacts"], state);

export const selectRas = (state) => path(["pinsInfo", PINS.RAS], state);
export const selectCas = (state) => path(["pinsInfo", PINS.CAS], state);

export const selectAddressRowPins = (state) => {
  return path(["pinsInfo", "row"], state);
};

export const selectAddressColPins = (state) => {
  return path(["pinsInfo", "col"], state);
};

export const selectAddressPins = (state) => {
  const addressRow = selectAddressRowPins(state);
  const addressColumn = selectAddressColPins(state);
  return `${addressRow}${addressColumn}`;
};
