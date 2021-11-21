import React, { useState } from "react";

import BEM from "../../helpers/BEM";
import RAMVisualization from "../RAMVisualization";
import RoundArrow from "../../icons/RoundArrow";

import "./App.scss";
import RAMArticle from "../RAMArticle";

const b = BEM("App");

const DISPLAY_MODE = {
  visualization: "visualization",
  both: "both",
};

function App() {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.both);

  return (
    <div className={b()}>
      <RAMArticle />
      <RAMVisualization />
    </div>
  );
}

export default App;
