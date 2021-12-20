import React from "react";

import Memory from "../Memory";
import MemoryControls from "../MemoryControls";
import VisualizationSettings from "../VisualizationSettings";
import HowTo from "../HowTo";

import BEM from "../../helpers/BEM";
import "./RAMVisualization.scss";

const b = BEM("RAMVisualization");

const RAMVisualization = () => {
  return (
    <div id="playground" className={b()}>
      <div className={b("container")}>
        <header className={b("caption")}>
          <h2>RAM Playground</h2>
          <VisualizationSettings />
        </header>
        <div className={b("content")}>
          <div className={b("main")}>
            <div className={b("memoryCircuit")}>
              <div className={b("pins")}>
                <MemoryControls />
              </div>
              <div className={b("memory")}>
                <Memory />
              </div>
            </div>
            <div className={b("notes")}>
              <div>＊ LSB - Least Significant Bit (right-most bit)</div>
              <div>＊ MSB - Most Significant Bit (left-most bit)</div>
            </div>
          </div>
          <div className={b("howTo")}>
            <HowTo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RAMVisualization;
