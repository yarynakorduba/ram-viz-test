import React from "react";
import BEM from "../../helpers/BEM";

const b = BEM("Memory");

const Frame = ({ coords, measures, isShowSelected }) => {
  const { x, y } = coords;
  const { width, height } = measures;
  return (
    <rect
      key={`${x}-${y}`}
      transform="translate(1 1)"
      y={y}
      x={x}
      width={width - 2}
      height={height - 2}
      className={b("frame", [isShowSelected ? "selected" : "preselected"])}
    />
  );
};

export default Frame;
