import { path, take, takeLast, compose } from "ramda";
import {
  SET_PINS,
  SET_PINS_WIDTH,
  SET_TACTS,
  SET_CURRENT_TACTS,
  SET_ADDRESS_ROW,
  SET_ADDRESS_COLUMN,
  TOGGLE_RAS_CAS,
} from "../actions";
import { MEMORY_MODE, MEMORY_STATE, PIN_STATE } from "../../helpers/consts";

const initialState = {
  address: PIN_STATE.OFF.repeat(4),
  ras: PIN_STATE.OFF,
  cas: PIN_STATE.OFF,
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
    case SET_ADDRESS_ROW:
      return {
        ...state,
        ras: payload,
      };
    case SET_ADDRESS_COLUMN:
      return {
        ...state,
        cas: payload,
      };

    case SET_PINS:
      return { ...state, [payload.type]: payload.value };

    case TOGGLE_RAS_CAS:
      return {
        ...state,
        ras: state.ras === PIN_STATE.ON ? PIN_STATE.OFF : PIN_STATE.ON,
        cas: state.cas === PIN_STATE.ON ? PIN_STATE.OFF : PIN_STATE.ON,
      };

    case SET_TACTS:
      return { ...state, tacts: payload.tacts, currentTacts: payload.tacts };

    case SET_CURRENT_TACTS:
      return { ...state, currentTacts: payload.tacts };

    case SET_PINS_WIDTH: {
      const { type, width } = payload;
      const updatedValue = state[type].padStart(width, "0").slice(-width);
      return {
        ...state,
        [type]: updatedValue,
        [`${type}Width`]: width,
      };
    }
    default:
      return state;
  }
};

export default pinsInfo;

export const selectAddress = (state) => path(["pinsInfo", "address"], state);
export const selectData = (state) => path(["pinsInfo", "data"], state);
export const selectDataWidth = (state) => path(["pinsInfo", "dataWidth"], state);
export const selectAddressWidth = (state) => path(["pinsInfo", "addressWidth"], state);
export const selectEnabled = (state) => path(["pinsInfo", "enabled"], state);
export const selectMemoryState = (state) => path(["pinsInfo", "readWrite"], state);
export const selectClock = (state) => path(["pinsInfo", "clock"], state);
export const selectTacts = (state) => path(["pinsInfo", "tacts"], state);
export const selectCurrentTacts = (state) => path(["pinsInfo", "currentTacts"], state);

export const selectRas = (state) => path(["pinsInfo", "ras"], state);
export const selectCas = (state) => path(["pinsInfo", "cas"], state);

export const selectAddressRow = (isRasCasEnabled) => (state) => {
  // if (isRasCasEnabled) return path(["pinsInfo", "ras"], state);
  return compose((address) => take(Math.floor(address.length / 2), address), path(["pinsInfo", "address"]))(state);
};

export const selectAddressColumn = (isRasCasEnabled) => (state) => {
  // if (isRasCasEnabled) return path(["pinsInfo", "cas"], state);
  return compose((address) => takeLast(Math.ceil(address.length / 2), address), path(["pinsInfo", "address"]))(state);
};
