import React from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/reactRedux.hks";
import { setPinsTypeWidth, setPins } from "../../redux/actions";
import { selectAddress, selectAddressWidth, selectRas, selectCas } from "../../redux/reducers/pinsInfo.red";

import BEM from "../../helpers/BEM";

import Pins from "../PinsBlock";
import { selectIsRasCasEnabled } from "../../redux/reducers/visualizationSettings.red";
import { PINS, PIN_STATE } from "../../helpers/consts";

const b = BEM("MemoryControls");

export const AddressControls = () => {
  const address = useSelector(selectAddress);
  const addressLength = useSelector(selectAddressWidth);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const ras = useSelector(selectRas);
  const cas = useSelector(selectCas);

  const setPinsAct = useAction(setPins);
  const setPinsWidthAct = useAction(setPinsTypeWidth);

  const setAddressLength = (width) => setPinsWidthAct(PINS.ADDRESS, width);
  const setAddress = (address) => setPinsAct(PINS.ADDRESS, address);

  const handleInputAddressLength = (ev) => setAddressLength(+ev.target.value);

  return (
    <div className={b("addressBlock")}>
      <label className={b("addressLabel")}>
        <div>
          Address: {address}
          {"_".repeat(addressLength - address.length)} ({parseInt(address, 2)})
        </div>
        <div className={b("bitsWidth")}>width: {addressLength} bits</div>
        <input
          name="addressLength"
          type="range"
          min={2}
          max={8}
          defaultValue={addressLength}
          onInput={handleInputAddressLength}
        />
      </label>
      <div className={b("addressPins")}>
        <Pins binaryData={address} setBinaryData={setAddress} />
        {isRasCasEnabled && (
          <>
            <div className={b("ras")}>
              <span className={b("rasLabel", [ras === PIN_STATE.ON && "active"])}>ras</span>
              <Pins binaryData={ras} isDisabled />
            </div>
            <div className={b("cas")}>
              <span className={b("casLabel", [cas === PIN_STATE.ON && "active"])}>cas</span>
              <Pins binaryData={cas} isDisabled />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddressControls;
