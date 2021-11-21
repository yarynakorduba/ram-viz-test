import React from "react";

import BEM from "../../helpers/BEM";
import RAMVisualization from "../RAMVisualization";
import RAMArticle from "../RAMArticle";

import "./App.scss";

const b = BEM("App");

function App() {
  return (
    <div className={b()}>
      <RAMArticle />
      <RAMVisualization />
    </div>
  );
}

export default App;
