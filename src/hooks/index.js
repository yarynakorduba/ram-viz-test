import { useAction } from "./reactRedux.hks";
import { setMemory, setPins, setDatumInMemory, setCurrentTacts, toggleRasCasPart } from "../redux/actions";
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
  selectCurrentAddressPart,
  selectAddressRow,
  selectAddressColumn,
  selectClock,
} from "../redux/reducers/pinsInfo.red";
import { selectMemory } from "../redux/reducers/memory.red";
import { useEffect } from "react";
import { compose } from "redux";
import { map } from "ramda";
import { MEMORY_STATE, MEMORY_MODE } from "../helpers/consts";
import { selectIsRasCasEnabled, selectIsTactingEnabled } from "../redux/reducers/visualizationSettings.red";
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

export const useRasCas = () => {
  const setPinsAct = useAction(setPins);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const ras = useSelector(selectAddressRow(isRasCasEnabled));
  const cas = useSelector(selectAddressColumn(isRasCasEnabled));
  const addressWidth = useSelector(selectAddressWidth);
  const currentTacts = useSelector(selectCurrentTacts);
  const currentAddressPart = useSelector(selectCurrentAddressPart);

  useEffect(() => {
    setPinsAct("ras", "0".repeat(Math.ceil(addressWidth / 2)));
    setPinsAct("cas", "0".repeat(Math.floor(addressWidth / 2)));
    isRasCasEnabled ? setPinsAct("address", "") : setPinsAct("address", "0".repeat(addressWidth));
  }, [isRasCasEnabled, setPinsAct]);

  // join ras and cas address pins all together
  const rasCasResetRef = useRef();
  useEffect(() => {
    if (isRasCasEnabled && currentTacts === 0) {
      if (currentAddressPart === "ras") {
        setPinsAct("address", ras);
      } else {
        console.log("here!!!!!!");
        setPinsAct("address", `${ras}${cas}`);
        rasCasResetRef.current = setTimeout(() => {
          console.log("here!!!!!!FGHGFDFGHGDFG -- > ", addressWidth);
          setPinsAct("ras", "0".repeat(Math.ceil(addressWidth / 2)));
          setPinsAct("cas", "0".repeat(Math.floor(addressWidth / 2)));
          setPinsAct("address", "");
        }, 700);
      }
    }
  }, [isRasCasEnabled, currentAddressPart, ras, currentTacts, setPinsAct, cas]);
  useEffect(() => () => clearTimeout(rasCasResetRef.current), []);
};

export const useTacting = () => {
  const setCurrentTactsAct = useAction(setCurrentTacts);
  const setPinsAct = useAction(setPins);

  const tacts = useSelector(selectTacts);
  const clock = useSelector(selectClock);
  const isTactingEnabled = useSelector(selectIsTactingEnabled);
  const currentTacts = useSelector(selectCurrentTacts);

  const toggleRasCasPartAct = useAction(toggleRasCasPart);

  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);

  // reset clock pin to 0 state after a small timeout
  const resetClockTimeout = useRef();
  useEffect(() => {
    if (clock === "1")
      resetClockTimeout.current = setTimeout(() => {
        setPinsAct("clock", "0");
        if (isRasCasEnabled && currentTacts === 0) {
          toggleRasCasPartAct();
        }
      }, 500);
    return () => clearTimeout(resetClockTimeout.current);
  }, [clock, currentTacts, isRasCasEnabled, setPinsAct, toggleRasCasPartAct]);

  // reset current tacts to default tacts number, if current tacts number reached 0
  useEffect(() => {
    if (isTactingEnabled && !currentTacts && clock === "0") setCurrentTactsAct(tacts);
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

  const memorizedInfo = useSelector(selectMemory);
  const setDatumInMemoryAct = useAction(setDatumInMemory);
  const address = useSelector(selectAddress);
  const addressWidth = useSelector(selectAddressWidth);
  const enabled = useSelector(selectEnabled);
  const datum = useSelector(selectData);
  const memoryState = useSelector(selectMemoryState);
  const currentTacts = useSelector(selectCurrentTacts);

  const setDatum = (datum) => setPinsAct("data", datum);

  // update datum in memory
  useEffect(() => {
    if (
      enabled === MEMORY_STATE.ENABLED &&
      memoryState === MEMORY_MODE.WRITE &&
      currentTacts === 0 &&
      address.length === addressWidth
    ) {
      setDatumInMemoryAct(datum, address);
    }
  }, [enabled, memoryState, address, datum, currentTacts, addressWidth, setDatumInMemoryAct]);

  // read datum from memory back into data output pin
  useEffect(() => {
    if (memorizedInfo[parseInt(address, 2)] && memoryState === MEMORY_MODE.READ) {
      setDatum(memorizedInfo[parseInt(address, 2)].datum);
    }
  }, [memoryState, address]);
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
