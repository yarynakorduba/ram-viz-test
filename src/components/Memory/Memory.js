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
    { cellWidth, cellHeight, cellMargin, verticalOffset: headerHeight, containerWidth, containerHeight },
  ] = useMemoryCSSMeasures();

  const [getCellOrder] = useCellOrder();

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
          const { row, column } = getCellOrder(cellIndex);
          const { cellX, cellY, textX, textY } = getCellCoordinates(cellIndex);

          const selectedAddressStyles =
            parseInt(selectedAddress, 2) === cellIndex && selectedAddress.length === addressWidth ? "selected" : "";
          const selectedRowStyles = displayType === "matrix" && row === parseInt(selectedRow, 2) ? "inSelectedRow" : "";
          const selectedColumnStyles =
            displayType === "matrix" && column === parseInt(selectedColumn, 2) ? "inSelectedColumn" : "";
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
                  className={b("cell", [
                    selectedAddressStyles,
                    dirtyAddressStyles,
                    selectedRowStyles,
                    selectedColumnStyles,
                  ])}
                ></rect>
                <text className={b("dataLabel")} x={textX} y={textY}>
                  {cell.datum}
                </text>
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default Memory;
