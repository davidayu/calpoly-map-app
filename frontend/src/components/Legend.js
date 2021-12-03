import React, { useEffect, useState } from "react";
import { ReactComponent as StudyIcon } from "../icons/study.svg";
import { ReactComponent as DiningIcon } from "../icons/eating.svg";
import { ReactComponent as ArtIcon } from "../icons/brush.svg";
import { ReactComponent as CollapseIcon } from "../icons/collapse.svg";
import { ReactComponent as ExpandIcon } from "../icons/expand.svg";
import style from "../styles/Legend.module.css";
import axios from "axios";

function Legend(props) {
  const [studyChecked, setStudyChecked] = useState(false);
  const [diningChecked, setDiningChecked] = useState(false);
  const [artChecked, setArtChecked] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(
    () => querySearchedPins(),
    [studyChecked, diningChecked, artChecked]
  );

  function querySearchedPins() {
    let study_query = "";
    let eating_query = "";
    let art_query = "";

    if (studyChecked) study_query = "STUDY";
    if (diningChecked) eating_query = "DINING";
    if (artChecked) art_query = "ART";

    if (!studyChecked && !diningChecked && !artChecked) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/pins`)
        .then((response) => {
          if (response && response.status === 200) {
            props.updateSearchedPins(response.data.pins_list);
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get(
          `${process.env.REACT_APP_API_HOST}/pins?type=${study_query}&type=${eating_query}&type=${art_query}`
        )
        .then((response) => {
          if (response && response.status === 200) {
            props.updateSearchedPins(response.data.pins_list);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function handleChange(event) {
    const { name } = event.target;
    if (name === "study") setStudyChecked(!studyChecked);
    else if (name === "dining") setDiningChecked(!diningChecked);
    else if (name === "art") setArtChecked(!artChecked);
  }

  function LegendItem(props) {
    return (
      <div className={style.legendItem}>
        {props.icon}
        <label className={style.legendItemLabel} htmlFor={props.type}>
          <p> {props.text} </p>
        </label>
        <input
          className="checkBox"
          type="checkbox"
          id={props.type}
          name={props.type}
          checked={props.checked}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div className={style.legend}>
      {expanded ? (
        <div>
          <button
            className={style.expandIconWrapper}
            onClick={() => setExpanded(false)}
          >
            <CollapseIcon className={style.expandIcon} />
          </button>
          {/* fieldset tag with legend subtag is more appropriate but has issues on many browsers */}
          <h2 className={style.title}> Legend </h2>
          <LegendItem
            type="study"
            text="Study"
            icon={<StudyIcon className={style.typeIcon} />}
            checked={studyChecked}
          />
          <LegendItem
            type="dining"
            text="Dining"
            icon={<DiningIcon className={style.typeIcon} />}
            checked={diningChecked}
          />
          <LegendItem
            type="art"
            text="Art"
            icon={<ArtIcon className={style.typeIcon} />}
            checked={artChecked}
          />
        </div>
      ) : (
        <button
          className={style.collapseIconWrapper}
          onClick={() => setExpanded(true)}
        >
          <ExpandIcon className={style.collapseIcon} />
        </button>
      )}
    </div>
  );
}
export default Legend;
