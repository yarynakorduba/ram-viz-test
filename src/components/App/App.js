import React, { useState } from "react";

import BEM from "../../helpers/BEM";
import RAMVisualization from "../RAMVisualization";
import RoundArrow from "../../icons/RoundArrow";

import "./App.scss";

const b = BEM("App");

const DISPLAY_MODE = {
  visualization: "visualization",
  both: "both",
};

function App() {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.both);

  const handleCurtainClick = () => {
    setDisplayMode(displayMode === DISPLAY_MODE.visualization ? DISPLAY_MODE.both : DISPLAY_MODE.visualization);
  };

  return (
    <div className={b()}>
      <div className={b("content")}>
        <div className={b("vizColumn", [displayMode === DISPLAY_MODE.both && "halfSize"])}>
          <div className={b("vizContainer")}>
            <RAMVisualization />
          </div>
        </div>
        <div className={b("curtain")}>
          <RoundArrow
            className={b("curtainCloser", [displayMode === DISPLAY_MODE.visualization && "rotated"])}
            onClick={handleCurtainClick}
          />
        </div>
        <div
          className={b("articleColumn", [
            displayMode === DISPLAY_MODE.both && "halfSize",
            displayMode === DISPLAY_MODE.visualization && "hidden",
          ])}
        >
          <p>
            Random-access memory (RAM; /ræm/) is a form of computer memory that can be read and changed in any order,
            typically used to store working data and machine code.[1][2] A random-access memory device allows data items
            to be read or written in almost the same amount of time irrespective of the physical location of data inside
            the memory, in contrast with other direct-access data storage media (such as hard disks, CD-RWs, DVD-RWs and
            the older magnetic tapes and drum memory), where the time required to read and write data items varies
            significantly depending on their physical locations on the recording medium, due to mechanical limitations
            such as media rotation speeds and arm movement.
          </p>
          <p>
            RAM contains multiplexing and demultiplexing circuitry, to connect the data lines to the addressed storage
            for reading or writing the entry. Usually more than one bit of storage is accessed by the same address, and
            RAM devices often have multiple data lines and are said to be "8-bit" or "16-bit", etc.
            devices.[clarification needed] In today's technology, random-access memory takes the form of integrated
            circuit (IC) chips with MOS (metal-oxide-semiconductor) memory cells. RAM is normally associated with
            volatile types of memory (such as dynamic random-access memory (DRAM) modules), where stored information is
            lost if power is removed, although non-volatile RAM has also been developed.[3] Other types of non-volatile
            memories exist that allow random access for read operations, but either do not allow write operations or
            have other kinds of limitations on them.
          </p>
          <p>
            These include most types of ROM and a type of flash memory called NOR-Flash. The two main types of volatile
            random-access semiconductor memory are static random-access memory (SRAM) and dynamic random-access memory
            (DRAM). Commercial uses of semiconductor RAM date back to 1965, when IBM introduced the SP95 SRAM chip for
            their System/360 Model 95 computer, and Toshiba used DRAM memory cells for its Toscal BC-1411 electronic
            calculator, both based on bipolar transistors. Commercial MOS memory, based on MOS transistors, was
            developed in the late 1960s, and has since been the basis for all commercial semiconductor memory. The first
            commercial DRAM IC chip, the Intel 1103, was introduced in October 1970. Synchronous dynamic random-access
            memory (SDRAM) later debuted with the Samsung KM48SL2000 chip in 1992.
          </p>
          <p>This prototype shows how Random Access Memory works. You can use it to Read and Write to the memory. </p>
          <p>
            To write to the memory, do the following steps:
            <ol>
              <li>
                Select the wanted input value by clicking on the <strong>Input</strong> pins.
              </li>
              <li>
                Select the wanted address by clicking on the <strong>Address</strong> pins
              </li>
              <li>
                Switch on <strong>Enable</strong> pin if it is switched off
              </li>
              <li>
                Switch <strong>Read / Write</strong> pin in <strong>Write</strong> mode
              </li>
            </ol>
          </p>
          <p>
            To read from the memory, do the following steps:
            <ol>
              <li>
                Switch <strong>Read / Write</strong> pin in <strong>Read</strong> mode
              </li>
              <li>
                Select the wanted address by clicking on the <strong>Address</strong> pins
              </li>
              <li>
                Switch on <strong>Enable</strong> pin if it is switched off
              </li>
            </ol>
          </p>
          <p>
            To experiment with tacting, do the following steps:
            <ol>
              <li>
                Check the <strong>Tacting</strong> checkbox
              </li>
              <li>
                Select the wanted input value by clicking on the <strong>Input</strong> pins.
              </li>
              <li>
                Select the wanted address by clicking on the <strong>Address</strong> pins. You can see now, that the{" "}
                <strong>Input</strong> value is not written to the memory cell right away. Because of RAM latency, we
                need to wait for a few tacts to actually write the data into memory.
              </li>
              <li>
                Tacting is controlled by the <strong>Clock</strong> pin. In computer, tacting happens automatically. In
                the prototype, you can simulate tacting by clicking on <strong>Clock</strong> a predefined number of
                times.
              </li>
            </ol>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
