import React from "react";
import BEM from "../../helpers/BEM";

import "./ArticleSection.scss";

const b = BEM("ArticleSection");

const ArticleSection = ({ children, name, displayedName }) => {
  return (
    <div className={b(name)}>
      <div className={b("content")}>
        {children}
        <label className={b("confirmation")}>
          <input type="checkbox" className={b("checkbox")} />I have finished reading the section "{displayedName}"
        </label>
      </div>
    </div>
  );
};

export default ArticleSection;
