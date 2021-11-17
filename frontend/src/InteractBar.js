import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as ListIcon } from "./svg/list.svg";
import { ReactComponent as AddPinIcon } from "./svg/file-plus.svg";
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
    </div>
  );
}

export default InteractBar;
