import React, { useMemo } from "react";
import BEM from "../../helpers/BEM";

import { useSelector } from "react-redux";
import { selectMemory, selectSelectedColumn, selectSelectedRow } from "../../redux/reducers/memory.red";
import {
  selectAddressPins,
  selectAddressRowPins,
  selectAddressColPins,
  selectAddressWidth,
} from "../../redux/reducers/pinsInfo.red";
import { useAction } from "../../hooks/reactRedux.hks";
import { setMemoryDisplayType } from "../../redux/actions";
import { selectMemoryDisplayType } from "../../redux/reducers/visualizationSettings.red";
import { useCellOrder, useMemoryCSSMeasures } from "../../hooks/memoryView.hks";
import ToggleButtons from "../ToggleButtons";
import { VIEW_OPTIONS } from "../../helpers/consts";

import "./Memory.scss";

const b = BEM("Memory");

const Memory = () => {
  const setMemoryDisplayTypeAct = useAction(setMemoryDisplayType);

  const memorizedInfo = useSelector(selectMemory);
  const displayType = useSelector(selectMemoryDisplayType);
  const preselectedCol = useSelector(selectAddressColPins);
  const selectedColumn = useSelector(selectSelectedColumn);
  const preselectedRow = useSelector(selectAddressRowPins);
  const selectedRow = useSelector(selectSelectedRow);
  const addressWidth = useSelector(selectAddressWidth);
  const memoryDisplayType = useSelector(selectMemoryDisplayType);
  const preselectedAddress = useSelector(selectAddressPins);
  const selectedAddress = `${selectedRow}${selectedColumn}`;
  const isFullAddressSelected = useMemo(() => selectedAddress.length === addressWidth, [addressWidth, selectedAddress]);

  const [
    getCellCoordinates,
    getColCoordinates,
    getRowCoordinates,
    { cellWidth, cellHeight, cellMargin, verticalOffset: headerHeight, containerWidth, containerHeight, fontSize },
    { rowWidth, rowHeight },
    { colWidth, colHeight },
  ] = useMemoryCSSMeasures();

  const [, { totalRows, totalColumns }] = useCellOrder();

  const renderColumnHeader = (text, x, y) => (
    <text className={b("header")} x={x} y={y}>
      {text}
    </text>
  );

  const renderRowFrame = () =>
    new Array(totalRows).fill("").map((r, index) => {
      const { x, y } = getRowCoordinates(index);
      const isSelected = displayType === "matrix" && index === parseInt(selectedRow, 2);
      const isPreselected = displayType === "matrix" && index === parseInt(preselectedRow, 2);
      return (
        <rect
          key={`${x}-${y}`}
          transform="translate(1 1)"
          x={x}
          y={y}
          width={rowWidth - 2}
          height={rowHeight - 2}
          className={b("row", [isSelected && "selected", !isSelected && isPreselected && "preselected"])}
        />
      );
    });

  const renderColFrame = () =>
    new Array(totalColumns).fill("").map((r, index) => {
      const { x, y } = getColCoordinates(index);
      const isSelected = displayType === "matrix" && index === parseInt(selectedColumn, 2);
      const isPreselected = displayType === "matrix" && index === parseInt(preselectedCol, 2);

      return (
        <rect
          key={`${x}-${y}`}
          transform="translate(1 1)"
          y={y}
          x={x}
          width={colWidth - 2}
          height={colHeight - 2}
          className={b("column", [isSelected && "selected", !isSelected && isPreselected && "preselected"])}
        />
      );
    });

  const renderMemoryView = () =>
    memorizedInfo.map((cell, cellIndex) => {
      const { cellX, cellY, textX, textY } = getCellCoordinates(cellIndex);

      const preselectedAddressStyles = parseInt(preselectedAddress, 2) === cellIndex ? "preselected" : "";
      const selectedAddressStyles =
        selectedAddress === preselectedAddress && parseInt(selectedAddress, 2) === cellIndex && isFullAddressSelected
          ? "selected"
          : "";

      const dirtyAddressStyles = cell.isDirty ? "dirty" : "";

      return (
        <g key={cellIndex}>
          {displayType === "table" && (
            <g>
              <rect
                x={0}
                y={cellY}
                width={cellWidth}
                height={cellHeight}
                className={b("cellAddress", [selectedAddressStyles || preselectedAddressStyles, dirtyAddressStyles])}
              ></rect>
              <text className={b("addressLabel")} x={cellX - cellMargin} y={cellY + (cellHeight + cellMargin) / 2}>
                {cellIndex}
              </text>
            </g>
          )}
          <g id={cellIndex}>
            <rect
              x={cellX}
              y={cellY}
              width={cellWidth}
              height={cellHeight}
              className={b("cell", [selectedAddressStyles || preselectedAddressStyles, dirtyAddressStyles])}
            />
            <text className={b("dataLabel")} x={textX} y={textY} fontSize={`${fontSize}px`}>
              {cell.datum}
            </text>
          </g>
        </g>
      );
    });

  return (
    <div className={b()}>
      <ToggleButtons
        containerClassName={b("viewOptions")}
        options={VIEW_OPTIONS}
        selectedValue={memoryDisplayType}
        handleSelect={setMemoryDisplayTypeAct}
      />
      <div className={b("memoryContainer")}>
        <svg style={{ minHeight: containerHeight, width: containerWidth }}>
          <g>
            {displayType === "table" && (
              <g>
                {renderColumnHeader("Address", cellWidth - cellMargin, headerHeight / 2)}
                {renderColumnHeader("Data", cellWidth * 2, headerHeight / 2)}
              </g>
            )}
            <g>
              {renderMemoryView()}
              {renderRowFrame()}
              {renderColFrame()}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Memory;
