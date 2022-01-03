import React from "react";
import { useSelector } from "react-redux";
import { slice } from "ramda";

import { useAction } from "../../hooks/reactRedux.hks";
import { setPinsTypeWidth, setAddressRowPins, setAddressColPins } from "../../redux/actions";
import {
  selectAddressWidth,
  selectRas,
  selectCas,
  selectAddressColPins,
  selectAddressRowPins,
} from "../../redux/reducers/pinsInfo.red";
import Pins from "../PinsBlock";
import { selectIsRasCasEnabled } from "../../redux/reducers/visualizationSettings.red";
import { PINS, PIN_STATE } from "../../helpers/consts";

import BEM from "../../helpers/BEM";

const b = BEM("MemoryControls");

export const AddressControls = () => {
  const addressRow = useSelector(selectAddressRowPins);
  const addressColumn = useSelector(selectAddressColPins);

  const addressLength = useSelector(selectAddressWidth);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const ras = useSelector(selectRas);
  const cas = useSelector(selectCas);

  const setAddressRowPinsAct = useAction(setAddressRowPins);
  const setAddressColPinsAct = useAction(setAddressColPins);
  const setPinsWidthAct = useAction(setPinsTypeWidth);

  const setAddressLength = (width) => setPinsWidthAct(PINS.ADDRESS, width);

  const handleInputAddressLength = ({ target }) => setAddressLength(+target.value);

  const handleSetAddress = (value) => {
    setAddressRowPinsAct(slice(0, value.length / 2, value));
    setAddressColPinsAct(slice(value.length / 2, value.length, value));
  };
  const padLength = Math.max(addressLength - addressRow.length - addressColumn.length, 0);
  const addressPins = `${"0".repeat(padLength)}${addressRow}${addressColumn}`;

  return (
    <div className={b("addressBlock")}>
      <label className={b("addressLabel")}>
        <div>Address: {addressPins}</div>
        <div>Decimal: {parseInt(addressPins, 2)}</div>
        <div className={b("bitsWidth")}>width: {addressLength} bits</div>
        <div className={b("rangeWrapper", ["address"])}>
          <input
            name="addressLength"
            type="range"
            min={2}
            max={8}
            step={2}
            defaultValue={addressLength}
            onInput={handleInputAddressLength}
          />
        </div>
      </label>
      <div className={b("addressPins")}>
        {!isRasCasEnabled && <Pins binaryData={addressPins} setBinaryData={handleSetAddress} />}
        {isRasCasEnabled && (
          <>
            {Number(ras) ? (
              <div className={b("rowAddress")}>
                <span className={b("rowAddressLabel", [ras === PIN_STATE.ON && "active"])}>
                  write
                  <br />
                  row
                  <br />
                  address
                </span>
                <Pins binaryData={addressRow} setBinaryData={setAddressRowPinsAct} />
              </div>
            ) : null}
            {Number(cas) ? (
              <div className={b("colAddress")}>
                <span className={b("colAddressLabel", [cas === PIN_STATE.ON && "active"])}>
                  write
                  <br />
                  col
                  <br />
                  address
                </span>
                <Pins binaryData={addressColumn} setBinaryData={setAddressColPinsAct} />
              </div>
            ) : null}
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
