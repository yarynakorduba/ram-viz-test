import React from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/reactRedux.hks";
import { setPinsTypeWidth, setPins, setAddressRow, setAddressColumn } from "../../redux/actions";
import {
  selectAddress,
  selectAddressWidth,
  selectAddressColumn,
  selectAddressRow,
  selectCurrentAddressPart,
} from "../../redux/reducers/pinsInfo.red";

import BEM from "../../helpers/BEM";

import Pins from "../PinsBlock";
import { selectIsRasCasEnabled } from "../../redux/reducers/visualizationSettings.red";
import { useRasCas } from "../../hooks";

const b = BEM("MemoryControls");

export const AddressControls = () => {
  const address = useSelector(selectAddress);
  const addressLength = useSelector(selectAddressWidth);
  const isRasCasEnabled = useSelector(selectIsRasCasEnabled);
  const ras = useSelector(selectAddressRow(isRasCasEnabled));
  const cas = useSelector(selectAddressColumn(isRasCasEnabled));
  const currentAddressPart = useSelector(selectCurrentAddressPart);

  const setPinsAct = useAction(setPins);
  const setPinsWidthAct = useAction(setPinsTypeWidth);
  const setAddressRowAct = useAction(setAddressRow);
  const setAddressColumnAct = useAction(setAddressColumn);

  const setAddressLength = (width) => setPinsWidthAct("address", width);
  const setAddress = (address) => setPinsAct("address", address);

  const handleInputAddressLength = (ev) => setAddressLength(+ev.target.value);

  useRasCas();

  console.log("---ras --- cas --- ", ras, cas);

  return (
    <div className={b("addressBlock")}>
      <label className={b("addressLabel")}>
        <div>
          Address: {address}
          {"_".repeat(addressLength - address.length)} ({parseInt(address, 2)})
        </div>
        <div className={b("bitsWidth")}>width: {addressLength} bits</div>
        <input
          name="dataLength"
          type="range"
          min={1}
          max={8}
          defaultValue={addressLength}
          onInput={handleInputAddressLength}
        />
      </label>
      <div className={b("addressPins")}>
        {isRasCasEnabled ? (
          <>
            <div className={b("ras")}>
              <span className={b("rasLabel", [currentAddressPart === "ras" && "active"])}>ras</span>
              <Pins binaryData={ras} setBinaryData={setAddressRowAct} />
            </div>
            <div className={b("cas")}>
              <span className={b("casLabel", [currentAddressPart === "cas" && "active"])}>cas</span>
              <Pins binaryData={cas} setBinaryData={setAddressColumnAct} />
            </div>
          </>
        ) : (
          <Pins binaryData={address} setBinaryData={setAddress} />
        )}
      </div>
    </div>
  );
};

export default AddressControls;
