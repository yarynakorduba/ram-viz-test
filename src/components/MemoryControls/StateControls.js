import React from "react";
import Pins from "../PinsBlock";
import BEM from "../../helpers/BEM";
import { useAction } from "../../hooks/reactRedux.hks";
import { setPins } from "../../redux/actions";
import { useSelector } from "react-redux";
import { selectMemoryState, selectEnabled } from "../../redux/reducers/pinsInfo.red";
import { MEMORY_MODE, MEMORY_STATE } from "../../helpers/consts";

const b = BEM("MemoryControls");

const StateControls = () => {
  const memoryState = useSelector(selectMemoryState);
  const enabled = useSelector(selectEnabled);

  const setPinsAct = useAction(setPins);

  const setMemoryState = (readWrite) => setPinsAct("readWrite", readWrite);
  const setEnabled = () => {
    setPinsAct("enabled", enabled === MEMORY_STATE.ENABLED ? MEMORY_STATE.DISABLED : MEMORY_STATE.ENABLED);
  };

  return (
    <div>
      <div className={b("enabledBlock")}>
        <label onClick={setEnabled} className={b("enabledLabel", [enabled === MEMORY_STATE.ENABLED && "enabled"])}>
          Enable
        </label>
        <Pins binaryData={enabled} setBinaryData={setEnabled} />
      </div>
      <div className={b("readWriteBlock")}>
        <label className={b("readWriteLabel")}>
          <span
            className={b("read", [memoryState === MEMORY_MODE.READ && "enabled"])}
            onClick={() => setMemoryState(MEMORY_MODE.READ)}
          >
            Read
          </span>
          /
          <span
            className={b("write", [memoryState === MEMORY_MODE.WRITE && "enabled"])}
            onClick={() => setMemoryState(MEMORY_MODE.WRITE)}
          >
            Write
          </span>
        </label>
        <Pins binaryData={memoryState} setBinaryData={setMemoryState} />
      </div>
    </div>
  );
};

export default StateControls;
