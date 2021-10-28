import { path } from "ramda";
import {
  SET_IS_PIN_NOTATION_CLASSICAL,
  SET_IS_TACTING_ENABLED,
  SET_MEMORY_DISPLAY_TYPE,
  SET_IS_RAS_CAS_ENABLED,
} from "../actions";

const initialState = {
  isPinsNotationClassical: false,
  isTactingEnabled: false,
  isRasCasEnabled: false,
  memoryDisplayType: "matrix",
};

const visualizationSettings = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_IS_PIN_NOTATION_CLASSICAL:
      return {
        ...state,
        isPinsNotationClassical: payload.isClassical,
      };
    case SET_IS_TACTING_ENABLED:
      return {
        ...state,
        isTactingEnabled: payload.isEnabled,
        isRasCasEnabled: payload.isEnabled ? state.isRasCasEnabled : false,
      };
    case SET_IS_RAS_CAS_ENABLED:
      return {
        ...state,
        isRasCasEnabled: payload.isEnabled,
      };
    case SET_MEMORY_DISPLAY_TYPE:
      return {
        ...state,
        memoryDisplayType: payload.displayType,
      };
    default:
      return state;
  }
};

export default visualizationSettings;

export const selectIsPinNotationClassical = (state) =>
  path(["visualizationSettings", "isPinsNotationClassical"], state);

export const selectIsTactingEnabled = (state) => path(["visualizationSettings", "isTactingEnabled"], state);

export const selectMemoryDisplayType = (state) => path(["visualizationSettings", "memoryDisplayType"], state);

export const selectIsRasCasEnabled = (state) => path(["visualizationSettings", "isRasCasEnabled"], state);
