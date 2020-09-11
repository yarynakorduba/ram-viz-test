import { useAction } from "./reactRedux.hks";
import {
  setMemory,
  setPins,
  setDatumInMemory,
  toggleRasCas,
  setSelectedAddressInMemory,
  setAddressColumnInMemory,
  setAddressRowInMemory,
  setClockPin,
} from "../redux/actions";
import { useSelector } from "react-redux";
import {
  selectDataWidth,
  selectAddressWidth,
  selectAddress,
  selectEnabled,
  selectData,
  selectMemoryState,
  selectCurrentTacts,
  selectClock,
  selectRas,
} from "../redux/reducers/pinsInfo.red";
import { selectMemory, selectSelectedAddress } from "../redux/reducers/memory.red";
import { useEffect } from "react";
import { compose } from "redux";
import { map, take, takeLast } from "ramda";
import { MEMORY_STATE, MEMORY_MODE, PINS, PIN_STATE } from "../helpers/consts";
import { selectIsRasCasEnabled } from "../redux/reducers/visualizationSettings.red";
import { useRef } from "react";

export const useControlMemorySize = () => {
  const setMemoryAct = useAction(setMemory);

  const dataWidth = useSelector(selectDataWidth);
  const addressWidth = useSelector(selectAddressWidth);
  const memorizedInfo = useSelector(selectMemory);

  useEffect(() => {
    if (addressWidth) {
      compose(
        setMemoryAct,
        (memory) => memory.map((memoryCell, index) => memorizedInfo[index] || memoryCell),
        (memory) =>
          memory.fill({
            isDirty: false,
            datum: PIN_STATE.OFF.repeat(dataWidth),
          })
      )(new Array(Math.pow(2, addressWidth)));
    }
  }, [addressWidth, dataWidth, setMemoryAct]);
};

// This hook determines cell row and column order in matrix view
export const useCellOrder = () => {
  const addressLength = useSelector(selectAddressWidth);
  const getCellOrder = (cellIndex) => ({
    column: cellIndex % Math.pow(2, Math.floor(addressLength / 2)),
    row: Math.floor(cellIndex / Math.pow(2, Math.floor(addressLength / 2))),
  });

  const totalColumns = Math.pow(2, Math.floor(addressLength / 2));
  const totalRows = Math.floor(Math.pow(2, addressLength) / Math.pow(2, Math.floor(addressLength / 2)));
  return [getCellOrder, { totalRows, totalColumns }];
};
// --

// ---

// This hook controlls memory datum width
// Add adds zeros from the left to the datum, in case data width was increased
export const useControlMemoryDatumWidth = () => {
  const setMemoryAct = useAction(setMemory);
  const dataWidth = useSelector(selectDataWidth);
  const memorizedInfo = useSelector(selectMemory);

  useEffect(() => {
    compose(
      setMemoryAct,
      map((cell) => ({
        ...cell,
        datum: cell.datum.padStart(dataWidth, PIN_STATE.OFF).slice(-dataWidth),
      }))
    )(memorizedInfo);
  }, [dataWidth, setMemoryAct]);
};

export const useTacting = () => {
  const toggleRasCasAct = useAction(toggleRasCas);
  // const setCurrentTactsAct = useAction(setCurrentTacts);
  const setClockPinAct = useAction(setClockPin);
  const clock = useSelector(selectClock);
  const currentTacts = useSelector(selectCurrentTacts);

  // reset clock pin to 0 state after a small timeout
  const resetClockTimeout = useRef(null);
  useEffect(() => {
    if (clock === PIN_STATE.ON) {
      resetClockTimeout.current = setTimeout(() => {
        setClockPinAct(PIN_STATE.OFF);
      }, 500);
    }
    return () => clearTimeout(resetClockTimeout.current);
  }, [clock, currentTacts, setClockPinAct, toggleRasCasAct]);

  const handleSetClock = () => {
    if (currentTacts > 0) {
      setClockPinAct(PIN_STATE.ON);
    }
  };

  return [handleSetClock];
};

export const useReadWriteMemoryDatum = () => {
  const setPinsAct = useAction(setPins);
  const setSelectedAddressInMemoryAct = useAction(setSelectedAddressInMemory);
  const setSelectedRowInMemoryAct = useAction(setAddressRowInMemory);
  const setSelectedColInMemoryAct = useAction(setAddressColumnInMemory);
  const memorizedInfo = useSelector(selectMemory);
  const setDatumInMemoryAct = useAction(setDatumInMemory);
  const address = useSelector(selectAddress);
  const addressWidth = useSelector(selectAddressWidth);
  const dataWidth = useSelector(selectDataWidth);
  const selectedAddressInMemory = useSelector(selectSelectedAddress);
  const enabled = useSelector(selectEnabled);
  const datum = useSelector(selectData);
  const memoryState = useSelector(selectMemoryState);
  const currentTacts = useSelector(selectCurrentTacts);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const ras = useSelector(selectRas);

  const setDatum = (datum) => setPinsAct(PINS.DATA, datum);

  useEffect(() => {
    if (memoryState && currentTacts !== 0) {
      setDatum(PIN_STATE.OFF.repeat(dataWidth));
    }
  }, [memoryState]);

  // update datum in memory if address is already selected
  useEffect(() => {
    if (selectedAddressInMemory) {
      if (memoryState === MEMORY_MODE.WRITE) {
        setDatumInMemoryAct(datum, selectedAddressInMemory);
        setSelectedAddressInMemoryAct("");
      }
    }
  }, [selectedAddressInMemory, datum, setDatumInMemoryAct, setSelectedColInMemoryAct, setSelectedRowInMemoryAct]);

  // update datum in memory if address is already selected
  useEffect(() => {
    if (selectedAddressInMemory) {
      if (memoryState === MEMORY_MODE.READ) {
        setDatum(memorizedInfo[parseInt(address, 2)].datum);
        setSelectedAddressInMemoryAct("");
      }
    }
  }, [memoryState, memorizedInfo, address, selectedAddressInMemory, datum]);

  // set selected address in memory
  useEffect(() => {
    if (enabled === MEMORY_STATE.ENABLED && currentTacts === 0) {
      if (!isRasCasEnabled) {
        if (memoryState === MEMORY_MODE.WRITE) {
          setSelectedAddressInMemoryAct(address);
        } else {
          setDatum(memorizedInfo[parseInt(address, 2)].datum);
        }
      } else {
        if (ras === PIN_STATE.ON) {
          setSelectedRowInMemoryAct(take(Math.ceil(addressWidth / 2), address));
        } else {
          setSelectedColInMemoryAct(takeLast(Math.floor(addressWidth / 2), address));
        }
      }
    }
  }, [enabled, memoryState, address, datum, currentTacts, addressWidth, setDatumInMemoryAct]);
};
