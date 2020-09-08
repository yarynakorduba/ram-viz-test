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
  selectAddressRow,
  selectAddressColumn,
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
import { MEMORY_STATE, MEMORY_MODE } from "../helpers/consts";
import { selectIsRasCasEnabled, selectIsTactingEnabled } from "../redux/reducers/visualizationSettings.red";
import { useRef } from "react";

export const useToggleRasCas = () => {
  const setPinsAct = useAction(setPins);
  const toggleRasCasAct = useAction(toggleRasCas);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const currentTacts = useSelector(selectCurrentTacts);

  useEffect(() => {
    if (isRasCasEnabled) setPinsAct("ras", "1");
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
            datum: "0".repeat(dataWidth),
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
        datum: cell.datum.padStart(dataWidth, "0").slice(-dataWidth),
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
  return [getCellOrder];
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
    if (clock === "1")
      resetClockTimeout.current = setTimeout(() => {
        setPinsAct("clock", "0");
      }, 500);
    return () => clearTimeout(resetClockTimeout.current);
  }, [clock, currentTacts, setPinsAct, toggleRasCasAct]);

  // reset current tacts to default tacts number, if current tacts number reached 0
  useEffect(() => {
    console.log("==!@#= > ", isTactingEnabled);
    if (isTactingEnabled && !currentTacts && clock === "0") setCurrentTactsAct(tacts);
    // else if (!isTactingEnabled) setCurrentTactsAct(0);
  }, [isTactingEnabled, tacts, currentTacts, clock, setCurrentTactsAct]);

  const handleSetClock = () => {
    if (currentTacts > 0) {
      setPinsAct("clock", "1");
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

  const setDatum = (datum) => setPinsAct("data", datum);

  useEffect(() => {
    console.log("=== > ", selectedColInMemory, selectedRowInMemory);
    if (selectedRowInMemory && selectedColInMemory) {
      setSelectedAddressInMemoryAct(`${selectedRowInMemory}${selectedColInMemory}`);
    }
  }, [selectedRowInMemory, selectedColInMemory, setSelectedAddressInMemoryAct]);

  // update datum in memory if address is already selected
  useEffect(() => {
    if (selectedAddressInMemory) {
      setDatumInMemoryAct(datum, selectedAddressInMemory);
      setSelectedAddressInMemoryAct("");
      setSelectedRowInMemoryAct("");
      setSelectedColInMemoryAct("");
    }
  }, [selectedAddressInMemory, datum, setDatumInMemoryAct, setSelectedColInMemoryAct, setSelectedRowInMemoryAct]);

  // set selected address in memory
  useEffect(() => {
    if (enabled === MEMORY_STATE.ENABLED && memoryState === MEMORY_MODE.WRITE && currentTacts === 0) {
      if (!isRasCasEnabled) {
        setSelectedAddressInMemoryAct(address);
      } else {
        if (ras === "1") {
          setSelectedRowInMemoryAct(take(Math.ceil(addressWidth / 2), address));
        } else {
          setSelectedColInMemoryAct(takeLast(Math.floor(addressWidth / 2), address));
        }
      }
    }
  }, [enabled, memoryState, address, datum, currentTacts, addressWidth, setDatumInMemoryAct]);

  // read datum from memory back into data output pin
  useEffect(() => {
    if (memorizedInfo[parseInt(address, 2)] && memoryState === MEMORY_MODE.READ) {
      setDatum(memorizedInfo[parseInt(address, 2)].datum);
    }
  }, [memoryState, address]);
};
