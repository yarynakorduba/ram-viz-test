import React from "react";
import Pins from "../PinsBlock";
import BEM from "../../helpers/BEM";
import { useAction } from "../../hooks/reactRedux.hks";
import { setTacts } from "../../redux/actions";
import { selectClock, selectCurrentTacts } from "../../redux/reducers/pinsInfo.red";
import { useSelector } from "react-redux";
import { selectTacts } from "../../redux/reducers/pinsInfo.red";
import { useTacting } from "../../hooks";

const b = BEM("MemoryControls");

const ClockControls = () => {
  const clock = useSelector(selectClock);
  const tacts = useSelector(selectTacts);
  const currentTacts = useSelector(selectCurrentTacts);
  const setTactsAct = useAction(setTacts);

  const [handleClock] = useTacting();

  return (
    <div className={b("clockBlock")}>
      <div className={b("clockPinBlock")}>
        <label className={b("clockLabel")}>
          <div onClick={handleClock} className={b("clock", [clock === "1" && "enabled"])}>
            Clock <span className={b("currentTacts")}>({currentTacts} tacts left)</span>
          </div>
          <div className={b("tacts")}>
            <input
              type="number"
              className={b("tactsNumber")}
              value={tacts}
              onChange={(ev) => setTactsAct(ev.target.value)}
            />{" "}
            Tacts <span className={b("tactsNote")}>determined by the hardware producer</span>
          </div>
        </label>
        <Pins binaryData={clock} setBinaryData={handleClock} />
      </div>
    </div>
  );
};

export default ClockControls;
