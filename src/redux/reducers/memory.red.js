import {
  SET_MEMORY,
  WRITE_DATUM_IN_MEMORY,
  SET_SELECTED_ADDRESS_IN_MEMORY,
  SET_SELECTED_ROW_IN_MEMORY,
  SET_SELECTED_COL_IN_MEMORY,
  RESET_MEMORY,
} from "../actions";
import { path, update } from "ramda";

const initialState = {
  memoryArray: new Array(16).fill({ datum: "0000", isDirty: false }),
  selectedAddress: { address: undefined, row: undefined, col: undefined },
};

const memory = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_MEMORY: {
      return {
        memoryArray: new Array(payload.width || 16).fill({ datum: "0000", isDirty: false }),
        selectedAddress: { address: undefined, row: undefined, col: undefined },
      };
    }
    case SET_SELECTED_ADDRESS_IN_MEMORY: {
      return {
        ...state,
        selectedAddress: { col: undefined, row: undefined, address: payload },
      };
    }
    case SET_SELECTED_ROW_IN_MEMORY: {
      return {
        ...state,
        selectedAddress: { ...state.selectedAddress, row: payload },
      };
    }
    case SET_SELECTED_COL_IN_MEMORY: {
      return {
        ...state,
        selectedAddress: { ...state.selectedAddress, col: payload },
      };
    }
    case WRITE_DATUM_IN_MEMORY: {
      const { address, datum } = payload;
      return {
        ...state,
        memoryArray: update(parseInt(address, 2), { datum, isDirty: true })(state.memoryArray),
      };
    }
    case SET_MEMORY: {
      return { ...state, memoryArray: payload.data };
    }
    default:
      return state;
  }
};

export default memory;

export const selectMemory = (state) => path(["memory", "memoryArray"], state);

export const selectSelectedRow = (state) => path(["memory", "selectedAddress", "row"], state);
export const selectSelectedColumn = (state) => path(["memory", "selectedAddress", "col"], state);
