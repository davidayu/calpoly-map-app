import React, { useState } from "react";
import { ReactComponent as StudyIcon } from "../icons/study.svg";
import { ReactComponent as EatingIcon } from "../icons/eating.svg";
import { ReactComponent as BrushIcon } from "../icons/brush.svg";
import { ReactComponent as ExpandIcon } from "../icons/expand.svg";
import axios from "axios";

function Legend(props) {
  const [study, setStudy] = useState(false);
  const [eating, setEating] = useState(false);
  const [art, setArt] = useState(false);
  const [expand, setExpand] = useState(true);

  function handleChange(event) {
    const { name } = event.target;
    if (name === "study") setStudy(!study);
    else if (name === "eating") setEating(!eating);
    else if (name === "art") setArt(!art);
    else if (name === "expand") setExpand(!expand);

    checkStates();
  }

  function checkStates() {
    var study_query = "";
    var eating_query = "";
    var art_query = "";

    if (study) study_query = "STUDY";
    if (eating) eating_query = "DINING";
    if (art) art_query = "ART";

    if (!study && !eating && !art) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/pins`)
        .then((response) => {
          if (response && response.status === 200) {
            console.log(response.data);
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
            console.log(response.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div>
      <button
        type="button"
        class="button"
        id="expand"
        name="expand"
        onClick={handleChange}
      >
        <ExpandIcon onClick={handleChange} />
      </button>
      <div id="legend-attributes" hidden={!expand}>
        <fieldset>
          <legend>Legend</legend>
          <div class="study-spaces">
            <label>
              {" "}
              <StudyIcon /> Study Spaces
              <input
                type="checkbox"
                id="study"
                name="study"
                checked={study}
                onChange={handleChange}
              />
            </label>
          </div>
          <div class="eating-spaces">
            <label>
              {" "}
              <EatingIcon /> Eating Spaces
              <input
                type="checkbox"
                id="eating"
                name="eating"
                checked={eating}
                onChange={handleChange}
              />
            </label>
          </div>
          <div class="art-spaces">
            <label>
              {" "}
              <BrushIcon /> Art Spaces
              <input
                type="checkbox"
                id="art"
                name="art"
                checked={art}
                onChange={handleChange}
              />
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
export default Legend;
