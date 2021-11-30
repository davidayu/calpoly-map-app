import React, { useState } from "react";
import Map from "./Map";
import axios from "axios";

function LocationForm() {
  const [position, setPosition] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [indoor, setIndoor] = useState(false);
  const [type, setType] = useState("STUDY");

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
            console.log(response.data);
            setPosition(null);
            setTitle("");
            setDescription("");
            setIndoor(false);
            setType("Study");
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div>
      <h1>Submit a new location</h1>
      <Map 
        newPinPosition={position} 
        handleMapClick={handleMapClick} 
        height="65vw"
      />
      <form>
        <label htmlFor="title"> Location Name </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description"> Location Description </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="indoor"> Indoor Location </label>
        <input
          type="checkbox"
          id="indoor"
          name="indoor"
          checked={indoor}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="type">Location Type </label>
        <select id="type" name="type" value={type} onChange={handleChange}>
          <option value="STUDY">Study</option>
          <option value="DINING">Dining</option>
          <option value="ART">Art</option>
        </select>
        <input type="button" value="Submit" onClick={handleSubmission} />
      </form>
    </div>
  );
}

export default LocationForm;
