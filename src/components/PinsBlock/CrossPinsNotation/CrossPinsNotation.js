import React, { useMemo } from "react";

import BEM from "../../../helpers/BEM";
import { DEFAULT_PIN_WIDTH, PIN_HEIGHT, PIN_LABEL_MARGIN } from "../../../helpers/consts";
import { usePrevious } from "../../../hooks";

import "./CrossPinsNotation.scss";

const b = BEM("CrossPinsNotation");

const CrossPinsNotation = ({ pinWidth, isNotationClassical, numberOfPins }) => {
  const crossedNotationYPosition = useMemo(() => (numberOfPins * PIN_HEIGHT) / 2 + PIN_HEIGHT / 2, [numberOfPins]);

  const previousIsNotationClassical = usePrevious(isNotationClassical);

  return (
    <>
      <line
        x1={pinWidth}
        y1={PIN_HEIGHT}
        x2={pinWidth}
        y2={numberOfPins * PIN_HEIGHT}
        className={b("pinsDivider", [isNotationClassical ? "visible" : "invisible"])}
      />
      <text
        x={45}
        y={crossedNotationYPosition - PIN_LABEL_MARGIN}
        className={b("pinsNumber", [isNotationClassical ? "visible" : "invisible"])}
      >
        {numberOfPins}
      </text>
      <line
        x1={isNotationClassical ? 50 : DEFAULT_PIN_WIDTH}
        y1={crossedNotationYPosition}
        x2={isNotationClassical ? 70 : DEFAULT_PIN_WIDTH}
        y2={crossedNotationYPosition}
        className={b("crossNotation", [isNotationClassical ? "visible" : "invisible"])}
      />
      {numberOfPins > 1 && (
        <line
          x1={pinWidth}
          y1={crossedNotationYPosition}
          x2={DEFAULT_PIN_WIDTH}
          y2={crossedNotationYPosition}
          className={b("pinsNotation", [
            isNotationClassical &&
              (previousIsNotationClassical === null || previousIsNotationClassical === isNotationClassical
                ? "visible"
                : "visibleAnimated"),
            !isNotationClassical && "invisible",
          ])}
        />
      )}
    </>
  );
};

export default CrossPinsNotation;
