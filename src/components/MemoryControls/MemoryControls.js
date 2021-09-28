import React from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/reactRedux.hks";

import { useReadWriteMemoryDatum, useControlMemoryDatumWidth } from '../../hooks/memoryView.hks';
import DataControls from "./DataControls";
import AddressControls from "./AddressControls";
import BEM from "../../helpers/BEM";
import StateControls from "./StateControls";
import ClockControls from "./ClockControls";
import ToggleButtons from "../ToggleButtons";

import { setIsPinNotationClassical } from "../../redux/actions";
import { selectIsPinNotationClassical } from "../../redux/reducers/visualizationSettings.red";

import "./MemoryControls.scss";

const b = BEM("MemoryControls");

const pinNotationOptions = [
  { value: false, label: "Default" },
  { value: true, label: "Classical" },
];

const MemoryControls = () => {
  const setIsPinNotationClassicalAct = useAction(setIsPinNotationClassical);
  const isPinNotationClassical = useSelector(selectIsPinNotationClassical);

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
