import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import BEM from "../../helpers/BEM";
import { selectMemory, selectSelectedColumn, selectSelectedRow } from "../../redux/reducers/memory.red";
import { selectAddressRowPins, selectAddressColPins, selectAddressWidth } from "../../redux/reducers/pinsInfo.red";
import { useAction } from "../../hooks/reactRedux.hks";
import { setMemoryDisplayType } from "../../redux/actions";
import { selectIsRasCasEnabled, selectMemoryDisplayType } from "../../redux/reducers/visualizationSettings.red";
import { useMemoryCSSMeasures } from "../../hooks/memoryView.hks";
import ToggleButtons from "../ToggleButtons";
import { VIEW_OPTIONS } from "../../helpers/consts";
import Frame from "./Frame";

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
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const preselectedAddress = `${preselectedRow}${preselectedCol}`;
  const selectedAddress = `${selectedRow}${selectedColumn}`;
  const isFullAddressSelected = useMemo(() => selectedAddress.length === addressWidth, [addressWidth, selectedAddress]);

  const [
    getCellCoordinates,
    getColCoordinates,
    getRowCoordinates,
    { cellWidth, cellHeight, cellMargin, verticalOffset: headerHeight, containerWidth, containerHeight, fontSize },
    rowMeasures,
    colMeasures,
  ] = useMemoryCSSMeasures();

  const selectedRowIndex = parseInt(selectedRow, 2);
  const preselectedRowIndex = parseInt(preselectedRow, 2);
  const selectedColIndex = parseInt(selectedColumn, 2);
  const preselectedColIndex = parseInt(preselectedCol, 2);

  const selectedRowCoords = getRowCoordinates(selectedRowIndex);
  const preselectedRowCoords = getRowCoordinates(preselectedRowIndex);
  const selectedColCoords = getColCoordinates(selectedColIndex);
  const preselectedColCoords = getColCoordinates(preselectedColIndex);

  const isShowSelectedRow = isRasCasEnabled ? selectedRow === preselectedRow : selectedAddress === preselectedAddress;
  const isShowSelectedCol = isRasCasEnabled
    ? selectedColumn === preselectedCol
    : selectedAddress === preselectedAddress;

  const renderColumnHeader = (text, x, y) => (
    <text className={b("header")} x={x} y={y}>
      {text}
    </text>
  );

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
              {displayType === "matrix" && (
                <>
                  <Frame
                    measures={colMeasures}
                    coords={isShowSelectedCol ? selectedColCoords : preselectedColCoords}
                    isShowSelected={isShowSelectedCol}
                  />
                  <Frame
                    measures={rowMeasures}
                    coords={isShowSelectedRow ? selectedRowCoords : preselectedRowCoords}
                    isShowSelected={isShowSelectedRow}
                  />
                </>
              )}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Memory;
