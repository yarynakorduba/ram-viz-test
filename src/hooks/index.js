import { useEffect, useRef } from "react";
import { compose } from "redux";
import { map } from "ramda";
import { useSelector } from "react-redux";

import { useAction } from "./reactRedux.hks";
import {
  setMemory,
  setPins,
  setDatumInMemory,
  setSelectedRowInMemory,
  setSelectedColInMemory,
  setClockPin,
} from "../redux/actions";
import {
  selectDataWidth,
  selectAddressWidth,
  selectAddress,
  selectData,
  selectMemoryState,
  selectCurrentTacts,
  selectClock,
  selectAddressColPins,
  selectAddressRowPins,
  selectEnabled,
  selectRas,
} from "../redux/reducers/pinsInfo.red";
import { selectMemory, selectSelectedRow, selectSelectedColumn } from "../redux/reducers/memory.red";
import { MEMORY_MODE, MEMORY_STATE, PINS, PIN_STATE } from "../helpers/consts";
import { selectIsRasCasEnabled } from "../redux/reducers/visualizationSettings.red";

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
  }, [clock, currentTacts, setClockPinAct]);

  const handleSetClock = () => {
    if (currentTacts > 0) {
      setClockPinAct(PIN_STATE.ON);
    }
  };

  return [handleSetClock];
};

export const useReadWriteMemoryDatum = () => {
  const setPinsAct = useAction(setPins);
  const setSelectedRowInMemoryAct = useAction(setSelectedRowInMemory);
  const setSelectedColInMemoryAct = useAction(setSelectedColInMemory);

  const memorizedInfo = useSelector(selectMemory);
  const setDatumInMemoryAct = useAction(setDatumInMemory);
  const address = useSelector(selectAddress);
  const rasAddr = useSelector(selectAddressRowPins);
  const casAddr = useSelector(selectAddressColPins);
  const dataWidth = useSelector(selectDataWidth);
  const datum = useSelector(selectData);
  const memoryState = useSelector(selectMemoryState);
  const isEnabled = useSelector(selectEnabled);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const currentTacts = useSelector(selectCurrentTacts);
  const selectedRow = useSelector(selectSelectedRow);
  const selectedCol = useSelector(selectSelectedColumn);
  const isRas = useSelector(selectRas) === PIN_STATE.ON;

  const setDatum = (datum) => setPinsAct(PINS.DATA, datum);

  // if memory state has been changed between read and write, reset the data
  useEffect(() => {
    if (memoryState && currentTacts !== 0) {
      setDatum(PIN_STATE.OFF.repeat(dataWidth));
    }
  }, [memoryState]);

  // update datum in memory if address is already selected
  useEffect(() => {
    if (
      selectedRow &&
      selectedCol &&
      isEnabled === MEMORY_STATE.ENABLED &&
      memoryState === MEMORY_MODE.WRITE &&
      currentTacts === 0
    ) {
      setDatumInMemoryAct(datum, `${selectedRow}${selectedCol}`);
    }
  }, [currentTacts, selectedCol, selectedRow, datum, isEnabled, setDatumInMemoryAct]);

  // read datum from memory if address is already selected
  useEffect(() => {
    if (selectedRow && selectedCol && memoryState === MEMORY_MODE.READ) {
      if (isEnabled === MEMORY_STATE.ENABLED) setDatum(memorizedInfo[parseInt(address, 2)].datum);
      else setDatum(PIN_STATE.OFF.repeat(dataWidth));
    }
  }, [memoryState, memorizedInfo, address, selectedRow, selectedCol, datum, isEnabled]);

  useEffect(() => {
    if (isRasCasEnabled) {
      setSelectedRowInMemoryAct(undefined);
      setSelectedColInMemoryAct(undefined);
    }
  }, [isRasCasEnabled, setSelectedColInMemoryAct, setSelectedColInMemoryAct]);

  useEffect(() => {
    if (!currentTacts && (!isRasCasEnabled || !isRas) && casAddr) {
      setSelectedColInMemoryAct(casAddr);
    }
    if (!currentTacts && (!isRasCasEnabled || isRas) && rasAddr) {
      setSelectedRowInMemoryAct(rasAddr);
    }
  }, [isRasCasEnabled, isRas, casAddr, rasAddr, currentTacts, setSelectedRowInMemoryAct]);
};

export const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};

export const usePrevious = (value, initialValue = null) => {
  const prev = useRef(initialValue);
  useEffect(() => {
    prev.current = value;
  });
  return prev.current;
};
