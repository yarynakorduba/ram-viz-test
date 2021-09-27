import React from "react";

import BEM from "../../../helpers/BEM";
import {
  PIN_STATE,
  PIN_HEIGHT,
  PIN_LABEL_MARGIN,
  SIGNIFICANCE_TEXT_WIDTH,
  DEFAULT_PIN_WIDTH,
} from "../../../helpers/consts";

import "./Pin.scss";

const b = BEM("Pin");

const Pin = ({
  id,
  pinState,
  pinWidth,
  handleDataPinClick,
  isDisabled,
  isNotationClassical,
  isOneOfMany,
  significance /* = 'MSB' | 'LSB' | undefined */,
}) => {
  return (
    <g key={id} onClick={handleDataPinClick(id)}>
      {significance && (
        <text
          x={-SIGNIFICANCE_TEXT_WIDTH}
          y={id * PIN_HEIGHT + PIN_HEIGHT - PIN_LABEL_MARGIN}
          className={b("pinSignificance")}
        >
          {significance}
        </text>
      )}
      <text
        x={0}
        y={id * PIN_HEIGHT + PIN_HEIGHT - PIN_LABEL_MARGIN}
        className={b("pinLabel", [pinState === PIN_STATE.ON && "selected", isDisabled && "disabled"])}
      >
        {pinState}
      </text>
      <rect
        x={0}
        y={id * PIN_HEIGHT}
        height={PIN_HEIGHT}
        width={pinWidth}
        className={b("pinArea", [isDisabled && "disabled"])}
      />
      <line
        x1={0}
        y1={id * PIN_HEIGHT + PIN_HEIGHT}
        x2={DEFAULT_PIN_WIDTH}
        y2={id * PIN_HEIGHT + PIN_HEIGHT}
        className={b("pinLine", [isNotationClassical && isOneOfMany ? "short" : "long"])}
      />
    </g>
  );
};

export default Pin;
