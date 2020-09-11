import { useAction } from "./reactRedux.hks";
import {
  setMemory,
  setPins,
  setDatumInMemory,
  setCurrentTacts,
  toggleRasCas,
  setSelectedAddressInMemory,
  setAddressColumnInMemory,
  setAddressRowInMemory,
} from "../redux/actions";
import { useSelector } from "react-redux";
import {
  selectDataWidth,
  selectAddressWidth,
  selectAddress,
  selectEnabled,
  selectData,
  selectMemoryState,
  selectTacts,
  selectCurrentTacts,
  selectClock,
  selectRas,
  selectCas,
} from "../redux/reducers/pinsInfo.red";
import {
  selectMemory,
  selectSelectedAddress,
  selectSelectedRow,
  selectSelectedColumn,
} from "../redux/reducers/memory.red";
import { useEffect } from "react";
import { compose } from "redux";
import { map, take, takeLast } from "ramda";
import { MEMORY_STATE, MEMORY_MODE, PINS, PIN_STATE } from "../helpers/consts";
import { selectIsRasCasEnabled, selectIsTactingEnabled } from "../redux/reducers/visualizationSettings.red";
import { useRef } from "react";

export const useToggleRasCas = () => {
  const setPinsAct = useAction(setPins);
  const toggleRasCasAct = useAction(toggleRasCas);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const currentTacts = useSelector(selectCurrentTacts);

  useEffect(() => {
    if (isRasCasEnabled) setPinsAct(PINS.RAS, PIN_STATE.ON);
  }, [isRasCasEnabled, setPinsAct]);

  useEffect(() => {
    if (isRasCasEnabled && currentTacts === 0) {
      toggleRasCasAct();
    }
  }, [currentTacts, toggleRasCasAct]);
};

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
            datum: (PIN_STATE.OFF).repeat(dataWidth),
          })
      )(new Array(Math.pow(2, addressWidth)));
    }
  }, [addressWidth, dataWidth, setMemoryAct]);
};

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

// ---

export const useTacting = () => {
  const setCurrentTactsAct = useAction(setCurrentTacts);
  const setPinsAct = useAction(setPins);

  const tacts = useSelector(selectTacts);
  const clock = useSelector(selectClock);
  const isTactingEnabled = useSelector(selectIsTactingEnabled);
  const currentTacts = useSelector(selectCurrentTacts);
  const toggleRasCasAct = useAction(toggleRasCas);
  // reset clock pin to 0 state after a small timeout
  const resetClockTimeout = useRef(null);
  useEffect(() => {
    if (clock === PIN_STATE.ON)
      resetClockTimeout.current = setTimeout(() => {
        setPinsAct(PINS.CLOCK, PIN_STATE.OFF);
      }, 500);
    return () => clearTimeout(resetClockTimeout.current);
  }, [clock, currentTacts, setPinsAct, toggleRasCasAct]);

  // reset current tacts to default tacts number, if current tacts number reached 0
  useEffect(() => {
    console.log("==!@#= > ", isTactingEnabled);
    if (isTactingEnabled && !currentTacts && clock === PIN_STATE.OFF) setCurrentTactsAct(tacts);
    // else if (!isTactingEnabled) setCurrentTactsAct(0);
  }, [isTactingEnabled, tacts, currentTacts, clock, setCurrentTactsAct]);

  const handleSetClock = () => {
    if (currentTacts > 0) {
      setPinsAct(PINS.CLOCK, PIN_STATE.ON);
      setCurrentTactsAct(currentTacts - 1);
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
  const selectedRowInMemory = useSelector(selectSelectedRow);
  const selectedColInMemory = useSelector(selectSelectedColumn);
  const enabled = useSelector(selectEnabled);
  const datum = useSelector(selectData);
  const memoryState = useSelector(selectMemoryState);
  const currentTacts = useSelector(selectCurrentTacts);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const ras = useSelector(selectRas);
  const cas = useSelector(selectCas);

  const setDatum = (datum) => setPinsAct(PINS.DATA, datum);

  useEffect(() => {
    console.log("=== > ", selectedColInMemory, selectedRowInMemory);
    if (selectedRowInMemory && selectedColInMemory) {
      setSelectedAddressInMemoryAct(`${selectedRowInMemory}${selectedColInMemory}`);
    }
  }, [selectedRowInMemory, selectedColInMemory, setSelectedAddressInMemoryAct]);

  useEffect(() => {
    if (memoryState && currentTacts !== 0) {
      setDatum((PIN_STATE.OFF).repeat(dataWidth));
    }
  }, [memoryState]);

  // update datum in memory if address is already selected
  useEffect(() => {
    if (selectedAddressInMemory) {
      if (memoryState === MEMORY_MODE.WRITE) {
        setDatumInMemoryAct(datum, selectedAddressInMemory);
        setSelectedAddressInMemoryAct("");
        setSelectedRowInMemoryAct("");
        setSelectedColInMemoryAct("");
      }
    }
  }, [selectedAddressInMemory, datum, setDatumInMemoryAct, setSelectedColInMemoryAct, setSelectedRowInMemoryAct]);

  // update datum in memory if address is already selected
  useEffect(() => {
    if (selectedAddressInMemory) {
      if (memoryState === MEMORY_MODE.READ) {
        setDatum(memorizedInfo[parseInt(address, 2)].datum);
        setSelectedAddressInMemoryAct("");
        setSelectedRowInMemoryAct("");
        setSelectedColInMemoryAct("");
      }
    }
  }, [
    memoryState,
    memorizedInfo,
    address,
    selectedAddressInMemory,
    datum,
    setSelectedColInMemoryAct,
    setSelectedRowInMemoryAct,
  ]);

  // set selected address in memory
  useEffect(() => {
    if (
      enabled === MEMORY_STATE.ENABLED &&
      // && memoryState === MEMORY_MODE.WRITE
      currentTacts === 0
    ) {
      if (!isRasCasEnabled) {
        if (memoryState === MEMORY_MODE.WRITE) {
          setSelectedAddressInMemoryAct(address);
        } else {
          setDatum(memorizedInfo[parseInt(address, 2)].datum);
        }
      } else {
        if (ras === PIN_STATE.OFF) {
          setSelectedRowInMemoryAct(take(Math.ceil(addressWidth / 2), address));
        } else {
          setSelectedColInMemoryAct(takeLast(Math.floor(addressWidth / 2), address));
        }
      }
    }
  }, [enabled, memoryState, address, datum, currentTacts, addressWidth, setDatumInMemoryAct]);
};
