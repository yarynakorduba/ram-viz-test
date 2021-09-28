import React, { useState, useEffect, useCallback, useMemo } from "react";
import { update, includes } from "ramda";
import { useSelector } from "react-redux";

import BEM from "../../helpers/BEM";
import { selectIsPinNotationClassical } from "../../redux/reducers/visualizationSettings.red";
import { PIN_STATE, DEFAULT_PIN_WIDTH, SIGNIFICANCE_TEXT_WIDTH, PIN_HEIGHT } from "../../helpers/consts";

import Pin from "./Pin";
import CrossPinsNotation from "./CrossPinsNotation";

import "./PinsBlock.scss";

const b = BEM("PinsBlock");

const PinsBlock = ({ binaryData, setBinaryData, isDisabled = false }) => {
  const [binaryDataArray, setBinaryDataArray] = useState(`${binaryData}`.split(""));
  const numberOfPins = binaryDataArray.length;
  const isNotationClassical = useSelector(selectIsPinNotationClassical);
  const pinWidth = useMemo(() => (isNotationClassical ? 25 : DEFAULT_PIN_WIDTH), [isNotationClassical]);
  const viewBoxWidth = useMemo(() => DEFAULT_PIN_WIDTH + SIGNIFICANCE_TEXT_WIDTH, []);
  const getIsFirstOrLastPin = useCallback((id) => includes(id, [0, binaryDataArray.length - 1]), [binaryDataArray]);

  useEffect(() => {
    if (binaryData) setBinaryDataArray(`${binaryData}`.split(""));
  }, [binaryData, setBinaryDataArray]);

  const handleDataPinClick = useCallback(
    (pinIndex) => () => {
      if (isDisabled) return;
      if (setBinaryData) {
        const updatedPinValue = Number(binaryDataArray[pinIndex]) === 0 ? PIN_STATE.ON : PIN_STATE.OFF;
        const updatedDataArray = update(pinIndex, updatedPinValue, binaryDataArray);
        setBinaryDataArray(updatedDataArray);
        setBinaryData(updatedDataArray.join(""));
      }
    },
    [binaryDataArray, isDisabled, setBinaryData]
  );

  const renderPin = useCallback(
    (pin, id) => {
      const significance = getIsFirstOrLastPin(id) && (id === 0 ? "MSB" : "LSB");
      return (
        <Pin
          key={id}
          id={id}
          pinState={pin}
          pinWidth={pinWidth}
          defaultPinWidth={DEFAULT_PIN_WIDTH}
          isOneOfMany={numberOfPins > 1}
          isNotationClassical={isNotationClassical}
          significance={numberOfPins > 1 && significance}
          handleDataPinClick={handleDataPinClick}
          isDisabled={isDisabled}
        />
      );
    },
    [isDisabled, numberOfPins, getIsFirstOrLastPin, handleDataPinClick, isNotationClassical, pinWidth]
  );

  return (
    <div className={b()}>
      <svg
        className={b("list")}
        width={viewBoxWidth}
        height={(numberOfPins + 1) * PIN_HEIGHT}
        viewBox={`-${SIGNIFICANCE_TEXT_WIDTH} 0 ${viewBoxWidth} ${(binaryDataArray.length + 1) * PIN_HEIGHT}`}
      >
        {binaryDataArray.map(renderPin)}
        <CrossPinsNotation pinWidth={pinWidth} isNotationClassical={isNotationClassical} numberOfPins={numberOfPins} />
      </svg>
    </div>
  );
};

export default PinsBlock;
