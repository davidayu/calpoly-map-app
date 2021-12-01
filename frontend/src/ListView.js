import React, { useEffect, useState } from "react";
import Home from "./Home";
import ReactDOM from "react-dom";
import axios from "axios";


import { ReactComponent as ThumbsUp } from "./thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "./thumbs-down.svg";

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
       const response = await axios.put('http://localhost:5000/pins/upvote/' + id, id);
       setList(response.data);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }
  
  async function downvotePin(id){
    try {
       const response = await axios.put('http://localhost:5000/pins/downvote/' + id, id);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  //let listitems = getPins();

  const [listItems, setList] = useState([]);
  /*let listItems = [
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
  ];*/
  

    useEffect(() => {
      getAllPins().then( result => {
        if (result)
            setList(result.data.pins_list);
            console.log(result.data);
      });
  }, [] );

  //listItems = getAllPins();
  console.log('access');
  //console.log(getAllPins());

  return (
    <div>
      <h1>List view</h1>
      <button onClick={goHome} style={{position: 'absolute',right: 0,top: 0,}}> X  </button>
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
