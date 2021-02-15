import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAction } from "../../hooks/reactRedux.hks";
import { setIsTactingEnabled, setIsRasCasEnabled, setCurrentTacts } from "../../redux/actions";
import { selectIsTactingEnabled, selectIsRasCasEnabled } from "../../redux/reducers/visualizationSettings.red";

import BEM from "../../helpers/BEM";
import "./VisualizationSettings.scss";

const b = BEM("VisualizationSettings");

const VisualizationSettings = () => {
  const isTactingEnabled = useSelector(selectIsTactingEnabled);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);

  const setIsTactingEnabledAct = useAction(setIsTactingEnabled);
  const setCurrentTactsAct = useAction(setCurrentTacts);
  const setIsRasCasEnabledAct = useAction(setIsRasCasEnabled);

  useEffect(() => {
    if (!isTactingEnabled) setCurrentTactsAct(0);
  }, [isTactingEnabled, setCurrentTactsAct]);

  return (
    <div className={b()}>
      <label className={b("tacting")}>
        <input
          className={b("tactingInput")}
          type="checkbox"
          checked={isTactingEnabled}
          onChange={() => setIsTactingEnabledAct(!isTactingEnabled)}
        />
        Tacting
      </label>
      <label className={b("rasCas")}>
        <input
          className={b("rasCasInput")}
          type="checkbox"
          checked={isRasCasEnabled}
          onChange={() => setIsRasCasEnabledAct(!isRasCasEnabled)}
        />
        RAS / CAS
      </label>
    </div>
  );
};

export default VisualizationSettings;
