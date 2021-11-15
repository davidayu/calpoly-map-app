import React from "react";
import { ReactComponent as ListView } from "./list.svg";
import { ReactComponent as AddPin } from "./file-plus.svg";
import { ReactComponent as RemovePin } from "./file-minus.svg";
import axios from "axios";

function InteractBar() {
  return (
    <div>
      <ListView />
      <AddPin />
      <RemovePin />
    </div>
  );
}

export default InteractBar;
