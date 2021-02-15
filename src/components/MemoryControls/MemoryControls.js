import React from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/reactRedux.hks";

import { useControlMemorySize, useControlMemoryDatumWidth, useReadWriteMemoryDatum } from "../../hooks";
import DataControls from "./DataControls";
import AddressControls from "./AddressControls";
import BEM from "../../helpers/BEM";
import StateControls from "./StateControls";
import ClockControls from "./ClockControls";
import ToggleButtons from "../ToggleButtons";

import {
  setIsPinNotationClassical,
  setIsTactingEnabled,
  setMemoryDisplayType,
  setIsRasCasEnabled,
  setCurrentTacts,
} from "../../redux/actions";
import {
  selectIsPinNotationClassical,
  selectIsTactingEnabled,
  selectMemoryDisplayType,
  selectIsRasCasEnabled,
} from "../../redux/reducers/visualizationSettings.red";

import "./MemoryControls.scss";

const b = BEM("MemoryControls");

const pinNotationOptions = [
  { value: false, label: "Default" },
  { value: true, label: "Classical" },
];

const MemoryControls = () => {
  const setIsPinNotationClassicalAct = useAction(setIsPinNotationClassical);
  const isPinNotationClassical = useSelector(selectIsPinNotationClassical);

  useControlMemorySize();
  useControlMemoryDatumWidth();
  useReadWriteMemoryDatum();

  return (
    <span className={b()}>
      <ToggleButtons
        containerClassName={b("viewOptions")}
        options={pinNotationOptions}
        selectedValue={isPinNotationClassical}
        handleSelect={setIsPinNotationClassicalAct}
      />
      <DataControls />
      <AddressControls />
      <StateControls />
      <ClockControls />
    </span>
  );
};

export default MemoryControls;
