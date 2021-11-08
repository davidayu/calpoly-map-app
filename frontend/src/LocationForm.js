import React, { useState } from "react";
import Map from "./Map";

function LocationForm() {
  const [position, setPosition] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [indoor, setIndoor] = useState(false);
  const [type, setType] = useState("");

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
      const location = {
        longitude: position.lat,
        latitude: position.lng,
        elevation: 0,
      };
      console.log(location);
      console.log({
        title: title,
        description: description,
        location: location,
        upvotes: 0,
        downvotes: 0,
        pinType: type,
        indoor: indoor,
      });
    }
  }

  return (
    <div>
      <h1>Submit a new location</h1>
      <Map position={position} handleMapClick={handleMapClick}></Map>
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
          <option value="Study">Study</option>
          <option value="Dining">Dining</option>
          <option value="Art">Art</option>
        </select>
        <input type="button" value="Submit" onClick={handleSubmission} />
      </form>
    </div>
  );
}

export default LocationForm;
