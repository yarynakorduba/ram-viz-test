import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { compose } from "redux";
import { map } from "ramda";

import { selectMemoryDisplayType } from "../redux/reducers/visualizationSettings.red";
import { useAction } from "./reactRedux.hks";
import {
  setMemory,
  setPins,
  setDatumInMemory,
  setSelectedRowInMemory,
  setSelectedColInMemory,
  setClockPin,
  readDatumFromMemory,
} from "../redux/actions";
import {
  selectAddressWidth,
  selectDataWidth,
  selectAddressPins,
  selectData,
  selectMemoryMode,
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

// This hook encapsulates the calculation of cell position in table / matrix view
export const useMemoryCSSMeasures = () => {
  const displayType = useSelector(selectMemoryDisplayType);
  const addressLength = useSelector(selectAddressWidth);
  const dataLength = useSelector(selectDataWidth);

  const [getCellOrder] = useCellOrder();

  // vertical offset is needed to leave some place for header
  const verticalOffset = 22;
  const cellWidth = displayType === "table" ? 100 : 70;
  const cellMargin = 2;
  const cellHeight = displayType === "table" ? 20 : 33;

  const containerWidth =
    displayType === "table"
      ? cellWidth * 2 + cellMargin
      : (cellWidth + cellMargin) * Math.pow(2, Math.floor(addressLength / 2));
  const containerHeight =
    displayType === "table"
      ? Math.pow(2, addressLength) * (cellHeight + cellMargin) + verticalOffset
      : Math.pow(2, Math.ceil(addressLength / 2)) * (cellHeight + cellMargin);

  const getCellPosition = (cellIndex) => {
    if (displayType === "table") {
      const cellY = verticalOffset + cellIndex * (cellHeight + cellMargin);
      return {
        cellX: cellWidth + cellMargin,
        cellY,
        textX: 2 * cellWidth,
        textY: cellY + (cellHeight + cellMargin) / 2,
      };
    }
    const { row, column } = getCellOrder(cellIndex);
    return {
      cellX: column * (cellWidth + cellMargin),
      cellY: row * (cellHeight + cellMargin),
      textX: column * (cellWidth + cellMargin) + cellWidth - cellMargin * 2,
      textY: row * (cellHeight + cellMargin) + (cellHeight + cellMargin) / 2,
    };
  };

  const getRowPosition = (rowIndex) => ({ x: 0, y: rowIndex * (cellHeight + cellMargin) });
  const getColPosition = (colIndex) => ({ x: colIndex * (cellWidth + cellMargin), y: 0 });
  const widthForChar = cellWidth / dataLength;
  const MIN_FONT_SIZE = 13;
  const MAX_FONT_SIZE = 20;

  return [
    getCellPosition,
    getColPosition,
    getRowPosition,
    {
      cellWidth,
      cellHeight,
      cellMargin,
      verticalOffset,
      containerWidth,
      containerHeight,
      fontSize:
        widthForChar > MAX_FONT_SIZE
          ? MAX_FONT_SIZE
          : widthForChar < MIN_FONT_SIZE
          ? MIN_FONT_SIZE
          : cellWidth / dataLength,
    },
    { rowWidth: containerWidth - cellMargin, rowHeight: cellHeight },
    { colWidth: cellWidth, colHeight: containerHeight - cellMargin },
  ];
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
  const readDatumFromMemoryAct = useAction(readDatumFromMemory);

  const memorizedInfo = useSelector(selectMemory);
  const setDatumInMemoryAct = useAction(setDatumInMemory);
  const address = useSelector(selectAddressPins);
  const rasAddr = useSelector(selectAddressRowPins);
  const casAddr = useSelector(selectAddressColPins);
  const dataWidth = useSelector(selectDataWidth);
  const datum = useSelector(selectData);
  const memoryMode = useSelector(selectMemoryMode);
  const isEnabled = useSelector(selectEnabled);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const currentTacts = useSelector(selectCurrentTacts);
  const selectedRow = useSelector(selectSelectedRow);
  const selectedCol = useSelector(selectSelectedColumn);
  const isRas = useSelector(selectRas) === PIN_STATE.ON;

  const setDatum = (datum) => setPinsAct(PINS.DATA, datum);

  // if memory state has been changed between read and write, reset the data
  useEffect(() => {
    if (memoryMode && currentTacts !== 0) {
      setDatum(PIN_STATE.OFF.repeat(dataWidth));
    }
  }, [memoryMode]);

  // update datum in memory if address is already selected
  useEffect(() => {
    if (
      selectedRow &&
      selectedCol &&
      isEnabled === MEMORY_STATE.ENABLED &&
      memoryMode === MEMORY_MODE.WRITE &&
      currentTacts === 0
    ) {
      setDatumInMemoryAct(datum, `${selectedRow}${selectedCol}`);
    }
  }, [currentTacts, selectedCol, selectedRow, datum, isEnabled, setDatumInMemoryAct]);

  // read datum from memory if address is already selected
  useEffect(() => {
    if (selectedRow && selectedCol && memoryMode === MEMORY_MODE.READ && currentTacts === 0) {
      readDatumFromMemoryAct(address);
    }
  }, [
    currentTacts,
    memoryMode,
    memorizedInfo,
    address,
    selectedRow,
    selectedCol,
    datum,
    isEnabled,
    readDatumFromMemory,
  ]);

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
