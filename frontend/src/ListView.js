import React, { Component } from "react";
import Home from "./Home";
import ReactDOM from "react-dom";

function goHome() {
  //add browser router??
  ReactDOM.render(<Home />, document.getElementById("root"));
}

function ListView(props) {
  //let listitems = getPins();

  let listitems = [
    {
      title: "Study Bench",
      description: "Nice stone bench with shade from trees",
      upVotes: 3,
      downVotes: 4,
      pinType: "Study Location",
      color: "green",
    },
    {
      title: "Favorite place to eat by foodtrucks",
      description: "Picnic chairs on lawn by the gym",
      upVotes: 13,
      downVotes: 14,
      pinType: "Eating Location",
      color: "red",
    },
  ];

  return (
    <div>
      <h1>List view</h1>
      <button
        onClick={goHome}
        style={{ position: "absolute", right: 0, top: 0 }}
      >
        {" "}
        X{" "}
      </button>
      <p>
        {listitems.map((pin) => (
          <p style={{ outlineStyle: "groove", outlineColor: pin.color }}>
            <p style={{ fontSize: 20 }}> {pin.title}</p>
            <div>{pin.description}</div>
            <div style={{ float: "right", margin: 10 }}>
              Upvotes: {pin.upVotes} Downvotes: {pin.downVotes}{" "}
            </div>
            <p style={{ color: pin.color }}>Type: {pin.pinType}</p>
          </p>
        ))}
      </p>
    </div>
  );
}
export default ListView;
