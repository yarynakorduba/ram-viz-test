import React from "react";
import { useSelector } from "react-redux";

import { useControlMemorySize, useControlMemoryDatumWidth, useReadWriteMemoryDatum } from "../../hooks";
import DataControls from "./DataControls";
import AddressControls from "./AddressControls";
import BEM from "../../helpers/BEM";
import StateControls from "./StateControls";
import ClockControls from "./ClockControls";
import { selectIsTactingEnabled } from "../../redux/reducers/visualizationSettings.red";

import "./MemoryControls.scss";

const b = BEM("MemoryControls");

const MemoryControls = () => {
  useControlMemorySize();
  useControlMemoryDatumWidth();
  useReadWriteMemoryDatum();

  return (
    <span className={b()}>
      <DataControls />
      <AddressControls />
      <StateControls />
      <ClockControls />
    </span>
  );
};

export default MemoryControls;
