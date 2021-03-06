import React, { useState } from "react";
import Map from "./Map";
import axios from "axios";
import { pinTypesMap } from "../pinTypes.js";
import style from "../styles/LocationForm.module.css";
import { useNavigate } from "react-router-dom";

function LocationForm() {
  const [position, setPosition] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [indoor, setIndoor] = useState(false);
  const [type, setType] = useState(Object.keys(pinTypesMap)[0]);

  const navigate = useNavigate();

  function handleMapClick(pos) {
    setPosition(pos);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    else if (name === "description") setDescription(value);
    else if (name === "indoor") setIndoor(!indoor);
    else if (name === "type") setType(value);
  }

  function handleSubmission() {
    if (position && title.length >= 2 && type) {
      const newPin = {
        title: title,
        description: description,
        lat: position.lat,
        lon: position.lng,
        upvotes: 0,
        downvotes: 0,
        pinType: type,
        indoor: indoor,
      };
      axios
        .post(`${process.env.REACT_APP_API_HOST}/pins`, newPin)
        .then((response) => {
          if (response && response.status === 201) {
            const id = response.data._id;
            setPosition(null);
            setTitle("");
            setDescription("");
            setIndoor(false);
            setType(Object.keys(pinTypesMap)[0]);
            navigate(`../../?new=${id}`);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className={style.locationForm}>
      <Map
        newPinPosition={position}
        handleMapClick={handleMapClick}
        height="100vh"
        width="100vw"
        center={[35.304094, -120.668936]}
      />
      <div className={style.formCard}>
        <h2 className={style.header}>Submit a new location</h2>
        <form>
          <div className={style.formRowLarge}>
            <label htmlFor="title"> Location name </label>
            <input
              className={style.field + " " + style.outlined}
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className={style.formRowLarge}>
            <label htmlFor="description"> Location description </label>
            <textarea
              className={style.field + " " + style.outlined}
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className={style.formRowSmall}>
            <label htmlFor="indoor"> Indoor location </label>
            <input
              className={style.field}
              type="checkbox"
              id="indoor"
              name="indoor"
              checked={indoor}
              onChange={handleChange}
            />
          </div>
          <div className={style.formRowSmall}>
            <label htmlFor="type">Location type </label>
            <select
              className={style.field + " " + style.outlined}
              id="type"
              name="type"
              value={type}
              onChange={handleChange}
            >
              {Object.keys(pinTypesMap).map((pinType) => {
                return (
                  <option key={pinType} value={pinType}>
                    {pinTypesMap[pinType]["text"]}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={style.formRowSmall}>
            <input
              className={style.submitButton}
              type="button"
              value="Submit location"
              onClick={handleSubmission}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LocationForm;
