import React from "react";
import { useSelector } from "react-redux";
import { slice } from "ramda";
import { useAction } from "../../hooks/reactRedux.hks";
import { setPinsTypeWidth, setPins, setAddressRowPins, setAddressColPins } from "../../redux/actions";
import {
  selectAddress,
  selectAddressWidth,
  selectRas,
  selectCas,
  selectAddressColPins,
  selectAddressRowPins,
  selectCurrentTacts,
} from "../../redux/reducers/pinsInfo.red";

import BEM from "../../helpers/BEM";

import Pins from "../PinsBlock";
import { selectIsRasCasEnabled } from "../../redux/reducers/visualizationSettings.red";
import { PINS, PIN_STATE } from "../../helpers/consts";

const b = BEM("MemoryControls");

export const AddressControls = () => {
  const address = useSelector(selectAddress);
  const addressRow = useSelector(selectAddressRowPins);
  const addressColumn = useSelector(selectAddressColPins);

  const addressLength = useSelector(selectAddressWidth);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const ras = useSelector(selectRas);
  const cas = useSelector(selectCas);
  const tacts = useSelector(selectCurrentTacts);

  const setPinsAct = useAction(setPins);
  const setAddressRowPinsAct = useAction(setAddressRowPins);
  const setAddressColPinsAct = useAction(setAddressColPins);
  const setPinsWidthAct = useAction(setPinsTypeWidth);

  const setAddressLength = (width) => setPinsWidthAct(PINS.ADDRESS, width);

  const handleInputAddressLength = ({ target }) => console.log(target.value) || setAddressLength(+target.value);

  const handleSetAddress = (value) => {
    console.log("=handleSetAddress==>>> ", slice(0, value.length / 2, value), slice(value.length / 2, -1, value));
    setAddressRowPinsAct(slice(0, value.length / 2, value));
    setAddressColPinsAct(slice(value.length / 2, value.length, value));
  };
  console.log("addressLength");
  const padLength = Math.max(addressLength - addressRow.length - addressColumn.length, 0);
  const addressPins = `${"0".repeat(padLength)}${addressRow}${addressColumn}`;

  return (
    <div className={b("addressBlock")}>
      <label className={b("addressLabel")}>
        <div>Address: {addressPins}</div>
        <div>Decimal: {parseInt(addressPins, 2)}</div>
        <div className={b("bitsWidth")}>width: {addressLength} bits</div>
        <input
          name="addressLength"
          type="range"
          min={2}
          max={8}
          step={2}
          defaultValue={addressLength}
          onInput={handleInputAddressLength}
        />
      </label>
      <div className={b("addressPins")}>
        {!isRasCasEnabled && <Pins binaryData={addressPins} setBinaryData={handleSetAddress} />}
        {isRasCasEnabled && (
          <>
            {Number(ras) ? <Pins binaryData={addressRow} setBinaryData={setAddressRowPinsAct} /> : null}
            {Number(cas) ? <Pins binaryData={addressColumn} setBinaryData={setAddressColPinsAct} /> : null}
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
