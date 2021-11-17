import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as ListIcon } from "./list.svg";
import { ReactComponent as AddPinIcon } from "./file-plus.svg";
import { ReactComponent as RemovePinIcon } from "./file-minus.svg";
import axios from "axios";
import ListView from "./ListView";
import LocationForm from "./LocationForm";

function ShowListView() {
  ReactDOM.render(<ListView />, document.getElementById("root"));
}

function ShowLocationForm() {
  ReactDOM.render(<LocationForm />, document.getElementById("root"));
}


function InteractBar() {
  return (
    <div>
      <ListIcon onClick={ShowListView} />
      <AddPinIcon onClick={ShowLocationForm} />
      <RemovePinIcon />
    </div>
  );
}

export default InteractBar;
