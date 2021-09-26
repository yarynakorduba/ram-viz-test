import React, { useState, useEffect } from "react";
import { update, includes } from "ramda";
import BEM from "../../helpers/BEM";

import { useSelector } from "react-redux";
import { selectIsPinNotationClassical } from "../../redux/reducers/visualizationSettings.red";
import { PIN_STATE } from "../../helpers/consts";

import "./PinsBlock.scss";

const b = BEM("PinsBlock");

const PIN_HEIGHT = 20;
const PIN_LABEL_MARGIN = 3;
const PIN_TEXT_WIDTH = 25;

const PinsBlock = ({ binaryData, setBinaryData, isDisabled = false }) => {
  const [binaryDataArray, setBinaryDataArray] = useState(`${binaryData}`.split(""));
  const classicalNotation = useSelector(selectIsPinNotationClassical);

  useEffect(() => {
    if (binaryData) setBinaryDataArray(`${binaryData}`.split(""));
  }, [binaryData]);

  const handleDataPinClick = (pinIndex) => () => {
    if (isDisabled) return;
    if (setBinaryData) {
      const updatedPinValue = Number(binaryDataArray[pinIndex]) === 0 ? PIN_STATE.ON : PIN_STATE.OFF;
      const updatedDataArray = update(pinIndex, updatedPinValue, binaryDataArray);
      setBinaryDataArray(updatedDataArray);
      setBinaryData(updatedDataArray.join(""));
    }
  };
  const defaultPinWidth = 80;
  const pinWidth = classicalNotation ? 25 : defaultPinWidth;
  const crossedNotationYPosition = (binaryDataArray.length * PIN_HEIGHT) / 2 + PIN_HEIGHT / 2;
  return (
    <div className={b()}>
      <svg
        className={b("list")}
        width={defaultPinWidth + PIN_TEXT_WIDTH}
        height={(binaryDataArray.length + 1) * PIN_HEIGHT + PIN_TEXT_WIDTH}
        viewBox={`-${PIN_TEXT_WIDTH} 0 ${PIN_TEXT_WIDTH + defaultPinWidth} ${(binaryDataArray.length + 1) * PIN_HEIGHT + PIN_TEXT_WIDTH}`}
      >
        {binaryDataArray.map((pin, id) => {
          return (
            <g key={id} onClick={handleDataPinClick(id)}>
              {binaryDataArray.length > 1 && includes(id, [0, binaryDataArray.length - 1]) && (
                <text x={-PIN_TEXT_WIDTH} y={id * PIN_HEIGHT + PIN_HEIGHT - PIN_LABEL_MARGIN} className={b("pinSignificance")}>
                  {id === 0 ? "MSB" : "LSB"}
                </text>
              )}
              <text
                x={0}
                y={id * PIN_HEIGHT + PIN_HEIGHT - PIN_LABEL_MARGIN}
                className={b("pinLabel", [pin === PIN_STATE.ON && "selected", isDisabled && "disabled"])}
              >
                {pin}
              </text>
              <rect x={0} y={id * PIN_HEIGHT} height={PIN_HEIGHT} width={pinWidth} className={b("pinArea", [isDisabled && "disabled"])} />
              <line
                x1={0}
                y1={id * PIN_HEIGHT + PIN_HEIGHT}
                x2={defaultPinWidth}
                y2={id * PIN_HEIGHT + PIN_HEIGHT}
                className={b("pin", [classicalNotation && binaryDataArray.length > 1 ? "short" : "long"])}
              />
            </g>
          );
        })}
        <line
          x1={pinWidth}
          y1={PIN_HEIGHT}
          x2={pinWidth}
          y2={binaryDataArray.length * PIN_HEIGHT}
          className={b("pinsDivider", [classicalNotation ? "visible" : "invisible"])}
        />
        <text
          x={45}
          y={crossedNotationYPosition - PIN_LABEL_MARGIN}
          className={b("pinsNumber", [classicalNotation ? "visible" : "invisible"])}
        >
          {binaryDataArray.length}
        </text>
        <line
          x1={classicalNotation ? 50 : defaultPinWidth}
          y1={crossedNotationYPosition + 1}
          x2={classicalNotation ? 70 : defaultPinWidth}
          y2={crossedNotationYPosition + 1}
          className={b("crossNotation", [classicalNotation ? "visible" : "invisible"])}
        />
        {binaryDataArray.length > 1 && (<line
          x1={pinWidth}
          y1={crossedNotationYPosition}
          x2={defaultPinWidth}
          y2={crossedNotationYPosition}
          className={b("pinsNotation", [classicalNotation ? "visible" : "invisible"])}
        />
        )}
      </svg>
    </div>
  );
};

export default PinsBlock;
