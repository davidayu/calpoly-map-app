import React from "react";
import { ReactComponent as InteractBackground } from "./interact-bar.svg";

function InteractBar() {
  return (
    <div>
      <InteractBackground style={{top: '500px', left: '900px'}}/>
      <label htmlFor="interact" />
    </div>
  );
}

export default InteractBar;
