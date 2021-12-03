import React, { useEffect, useState } from "react";
import Home from "./Home";
import ReactDOM from "react-dom";
import axios from "axios";

import { ReactComponent as ThumbsUp } from "../icons/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "../icons/thumbs-down.svg";

function goHome(){
  ReactDOM.render(<Home />, document.getElementById("root"));
}

function ListView(props) {

  async function getAllPins(){
    try {
       const response = await axios.get('http://localhost:5000/pins');
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  async function upvotePin(id){
    try {
       let i = -1;
       const response = await axios.put('http://localhost:5000/pins/upvote/' + id, id);
       console.log(response);
       let pin = listItems.find((item) => item._id === id);
       console.log(pin);
       let newList = listItems;
       listItems.forEach((item, index) => {
        if (item._id == id){
          i = index;
        }
       });
       newList[i] = response.data;
       console.log(i);
       console.log([...listItems].indexOf(pin));
       setList([...newList]);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  async function downvotePin(id){
    try {
       let i = -1;
       const response = await axios.put('http://localhost:5000/pins/downvote/' + id, id);
       let pin = listItems.find((item) => item._id === id);
       let newList = listItems;
       listItems.forEach((item, index) => {
        if (item._id == id){
          i = index;
        }
       });
       newList[i] = response.data;
       setList([...newList]);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  const [listItems, setList] = useState([]);

    useEffect(() => {
      getAllPins().then( result => {
        if (result)
            setList(result.data.pins_list);
            console.log(result.data);
      });
  }, [] );

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
        {listItems.map((pin) => (
          <p style={{ outlineStyle: "groove", outlineColor: pin.color }}>
            <p style={{ fontSize: 20 }}> {pin.title}</p>
            <div>{pin.description}</div>
            <div style={{ float: "right", margin: 1 }}>
              <ThumbsUp onClick={() => upvotePin(pin._id)}/> {pin.upvotes} <ThumbsDown onClick={() => downvotePin(pin._id)}/> {pin.downvotes}{" "}
            </div>
            <p style={{ color: pin.color }}>Type: {pin.pinType}</p>
          </p>
        ))}
      </p>
    </div>
  );
}
export default ListView;
