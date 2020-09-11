import React from "react";
import BEM from "../../helpers/BEM";

import "./Memory.scss";
import { useSelector } from "react-redux";
import { selectMemory } from "../../redux/reducers/memory.red";
import {
  selectAddress,
  selectAddressRow,
  selectAddressColumn,
  selectAddressWidth,
} from "../../redux/reducers/pinsInfo.red";
import { selectMemoryDisplayType, selectIsRasCasEnabled } from "../../redux/reducers/visualizationSettings.red";
import { useCellOrder } from "../../hooks";
import { useMemoryCSSMeasures } from "../../hooks/htmlElements.hks";

const b = BEM("Memory");

const Memory = () => {
  const memorizedInfo = useSelector(selectMemory);
  const displayType = useSelector(selectMemoryDisplayType);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const selectedAddress = useSelector(selectAddress);
  const selectedRow = useSelector(selectAddressRow(isRasCasEnabled));
  const selectedColumn = useSelector(selectAddressColumn(isRasCasEnabled));
  const addressWidth = useSelector(selectAddressWidth);

  const [
    getCellCoordinates,
    getColCoordinates,
    getRowCoordinates,
    { cellWidth, cellHeight, cellMargin, verticalOffset: headerHeight, containerWidth, containerHeight, fontSize },
    { rowWidth, rowHeight },
    { colWidth, colHeight },
  ] = useMemoryCSSMeasures();

  const [, { totalRows, totalColumns }] = useCellOrder();

  return (
    <svg x={0} y={0} style={{ minHeight: containerHeight, width: containerWidth }} className={b()}>
      <g>
        <g>
          <text className={b("header")} x={cellWidth - cellMargin} y={headerHeight / 2}>
            Address
          </text>
          <text className={b("header")} x={cellWidth * 2} y={headerHeight / 2}>
            Data
          </text>
        </g>
        {memorizedInfo.map((cell, cellIndex) => {
          const { cellX, cellY, textX, textY } = getCellCoordinates(cellIndex);

          const selectedAddressStyles =
            parseInt(selectedAddress, 2) === cellIndex && selectedAddress.length === addressWidth ? "selected" : "";
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
                    className={b("cellAddress", [selectedAddressStyles, dirtyAddressStyles])}
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
                  className={b("cell", [selectedAddressStyles, dirtyAddressStyles])}
                ></rect>
                <text className={b("dataLabel")} x={textX} y={textY} font-size={`${fontSize}px`}>
                  {cell.datum}
                </text>
              </g>
            </g>
          );
        })}
        {new Array(totalRows).fill("").map((r, index) => {
          const { x, y } = getRowCoordinates(index);
          const isRowSelected = displayType === "matrix" && index === parseInt(selectedRow, 2);
          return (
            <rect x={x} y={y} width={rowWidth} height={rowHeight} className={b("row", [isRowSelected && "selected"])} />
          );
        })}
        {new Array(totalColumns).fill("").map((r, index) => {
          const { x, y } = getColCoordinates(index);
          const isColSelected = displayType === "matrix" && index === parseInt(selectedColumn, 2);

          return (
            <rect
              x={x}
              y={y}
              width={colWidth}
              height={colHeight}
              className={b("column", [isColSelected && "selected"])}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Memory;
