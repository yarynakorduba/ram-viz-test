import { SET_MEMORY, WRITE_DATUM_IN_MEMORY } from "../actions";
import { path, update } from "ramda";

const initialState = {
  memoryArray: new Array(16).fill({ datum: "0000", isDirty: false }),
};

const memory = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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
