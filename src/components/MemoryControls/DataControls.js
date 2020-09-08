import React from "react";
import { useAction } from "../../hooks/reactRedux.hks";
import { setPinsTypeWidth, setPins } from "../../redux/actions";
import { useSelector } from "react-redux";
import { selectData, selectDataWidth, selectMemoryState } from "../../redux/reducers/pinsInfo.red";
import { MEMORY_MODE } from "../../helpers/consts";
import BEM from "../../helpers/BEM";
import Pins from "../PinsBlock";

const b = BEM("MemoryControls");

const DataControls = ({ id }) => {
  const memoryState = useSelector(selectMemoryState);
  const datum = useSelector(selectData);

  const setPinsAct = useAction(setPins);
  const setPinsWidthAct = useAction(setPinsTypeWidth);

  const setDataLength = (width) => setPinsWidthAct("data", width);
  const setDatum = (datum) => setPinsAct("data", datum);

  const dataLength = useSelector(selectDataWidth);

  const handleInputDataLength = (ev) => setDataLength(+ev.target.value);

  return (
    <div className={b("dataBlock")}>
      <label className={b("dataLabel")}>
        <div className={b("dataMode")}>
          <span className={b("dataModeLabel")}>{memoryState === MEMORY_MODE.WRITE ? "Input: " : "Output: "}</span>
          <span>
            {datum} ({parseInt(datum, 2)})
          </span>
        </div>
        <div className={b("bitsWidth")}>width: {dataLength} bits</div>
        <input
          name="dataLength"
          type="range"
          min={1}
          max={8}
          defaultValue={dataLength}
          onInput={handleInputDataLength}
        />
      </label>
      <Pins binaryData={datum} setBinaryData={memoryState === MEMORY_MODE.WRITE && setDatum} />
    </div>
  );
};

export default DataControls;
