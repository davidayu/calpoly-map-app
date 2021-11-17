import React, { useState } from "react";
import { ReactComponent as StudyIcon } from "./study-icon.svg";
import { ReactComponent as EatingIcon } from "./eating-icon.svg";
import { ReactComponent as RelaxingIcon } from "./relaxing-icon.svg";
import { ReactComponent as ExpandIcon } from "./expand-icon.svg";

function Legend(props) {
  const [study, setStudy] = useState(false);
  const [eating, setEating] = useState(false);
  const [relaxing, setRelaxing] = useState(false);
  const [expand, setExpand] = useState(true);

  function handleChange(event) {
    const { name } = event.target;
    if (name === "study") setStudy(!study);
    else if (name === "eating") setEating(!eating);
    else if (name === "relaxing") setRelaxing(!relaxing);
    else if (name === "expand") setExpand(!expand);
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
          <div class="relaxing-spaces">
            <label>
              {" "}
              <RelaxingIcon /> Relaxing Spaces
              <input
                type="checkbox"
                id="relaxing"
                name="relaxing"
                checked={relaxing}
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
