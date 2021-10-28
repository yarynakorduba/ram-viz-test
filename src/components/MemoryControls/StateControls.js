import React from "react";
import { useSelector } from "react-redux";
import Pins from "../PinsBlock";
import BEM from "../../helpers/BEM";
import { useAction } from "../../hooks/reactRedux.hks";
import { setPins } from "../../redux/actions";
import { selectMemoryMode, selectEnabled } from "../../redux/reducers/pinsInfo.red";
import { MEMORY_MODE, MEMORY_STATE, PINS } from "../../helpers/consts";

const b = BEM("MemoryControls");

const StateControls = () => {
  const memoryMode = useSelector(selectMemoryMode);
  const enabled = useSelector(selectEnabled);

  const setPinsAct = useAction(setPins);

  const setMemoryState = (readWrite) => setPinsAct(PINS.READ_WRITE, readWrite);
  const setEnabled = () => {
    setPinsAct(PINS.ENABLED, enabled === MEMORY_STATE.ENABLED ? MEMORY_STATE.DISABLED : MEMORY_STATE.ENABLED);
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
            className={b("read", [memoryMode === MEMORY_MODE.READ && "enabled"])}
            onClick={() => setMemoryState(MEMORY_MODE.READ)}
          >
            Read
          </span>
          /
          <span
            className={b("write", [memoryMode === MEMORY_MODE.WRITE && "enabled"])}
            onClick={() => setMemoryState(MEMORY_MODE.WRITE)}
          >
            Write
          </span>
        </label>
        <Pins binaryData={memoryMode} setBinaryData={setMemoryState} />
      </div>
    </div>
  );
};

export default StateControls;
