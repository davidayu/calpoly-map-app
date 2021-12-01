import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/InteractBar.module.css";
import { ReactComponent as ListIcon } from "../icons/list.svg";
import { ReactComponent as AddPinIcon } from "../icons/file-plus.svg";

function InteractBar() {
  return (
    <div className={style.interactBar}>
      <Link 
         className={style.iconWrapper}
         to="/locations"
         title="Locations feed"
      >
         <ListIcon className={style.icon} />
      </Link>
      <Link 
         className={style.iconWrapper}
         to="locations/new"
         title="Submit a location"
      >
         <AddPinIcon className={style.icon} />
      </Link>
    </div>
  );
}

export default InteractBar;
