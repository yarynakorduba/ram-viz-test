import React from "react";
import { map } from "ramda";
import BEM from "../../helpers/BEM";

import "./ToggleButtons.scss";

const b = BEM("ToggleButtons");

const ToggleButtons = ({
  options,
  handleSelect = () => {
    /* noop */
  },
  selectedValue,
  containerClassName,
}) => {
  const onSelect = (value) => () => handleSelect(value);

  return (
    <div className={`${b()} ${containerClassName}`}>
      {map(
        ({ value, label }) =>
          console.log(selectedValue, value) || (
            <button className={b("option", [selectedValue === value && "selected"])} onClick={onSelect(value)}>
              {label}
            </button>
          ),
        options
      )}
    </div>
  );
};

export default ToggleButtons;
