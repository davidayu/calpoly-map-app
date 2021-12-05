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

//   async function upvotePin(id){
//     try {
//        let i = -1;
//        const response = await axios.patch(`${process.env.REACT_APP_API_HOST}/pins/${id}/upvotes`);
//        console.log(response);
//        let pin = listItems.find((item) => item._id === id);
//        console.log(pin);
//        let newList = listItems;
//        listItems.forEach((item, index) => {
//         if (item._id === id){
//           i = index;
//         }
//        });
//        newList[i] = response.data;
//        console.log(i);
//        console.log([...listItems].indexOf(pin));
//        setList([...newList]);
//        return response;
//     }
//     catch (error) {
//        console.log(error);
//        return false;
//     }
//   }

//   async function downvotePin(id){
//     try {
//        let i = -1;
//        const response = await axios.patch(`${process.env.REACT_APP_API_HOST}/pins/${id}/downvotes`);
//        let pin = listItems.find((item) => item._id === id);
//        let newList = listItems;
//        listItems.forEach((item, index) => {
//         if (item._id === id){
//           i = index;
//         }
//        });
//        newList[i] = response.data;
//        setList([...newList]);
//        return response;
//     }
//     catch (error) {
//        console.log(error);
//        return false;
//     }
//   }

  const [locations, setLocations] = useState([]);

    useEffect(() => {
      getAllPins().then( result => {
         if (result)
            setLocations(result.data.pins_list);
            console.log(result.data);
         });
      }, []);

   async function getAllPins(){
      try {
         const response = await axios.get(`${process.env.REACT_APP_API_HOST}/pins`);
         return response;
      }
      catch (error) {
         console.log(error);
         return false;
      }
   }


   function upvoteLocation(index) {
      const id = locations[index]["_id"];
      if (locations[index]["upvoted"]) {
         axios
            .patch(`${process.env.REACT_APP_API_HOST}/pins/${id}/upvotes?undo=true`)
            .then((response) => {
               if (response && response.status === 201) {
                  const tempLocations = locations.map(l => Object.assign({}, l));
                  tempLocations[index] = response.data;
                  tempLocations[index]["upvoted"] = false;
                  setLocations(tempLocations);
               }
            })
            .catch((error) => console.log(error));
      }
      else if (!locations[index]["upvoted"] && !locations[index]["downvoted"]) {
         axios
            .patch(`${process.env.REACT_APP_API_HOST}/pins/${id}/upvotes`)
            .then((response) => {
               if (response && response.status === 201) {
                  const tempLocations = locations.map(l => Object.assign({}, l));
                  tempLocations[index] = response.data;
                  tempLocations[index]["upvoted"] = true;
                  setLocations(tempLocations);
               }
            })
            .catch((error) => console.log(error));
      }
    }

    function downvoteLocation(index) {
      const id = locations[index]["_id"];
      if (locations[index]["downvoted"]) {
         axios
            .patch(`${process.env.REACT_APP_API_HOST}/pins/${id}/downvotes?undo=true`)
            .then((response) => {
               if (response && response.status === 201) {
                  const tempLocations = locations.map(l => Object.assign({}, l));
                  tempLocations[index] = response.data;
                  tempLocations[index]["downvoted"] = false;
                  setLocations(tempLocations);
               }
            })
            .catch((error) => console.log(error));
      }
      else if (!locations[index]["upvoted"] && !locations[index]["downvoted"]) {

         axios
         .patch(`${process.env.REACT_APP_API_HOST}/pins/${id}/downvotes`)
         .then((response) => {
            if (response && response.status === 201) {
               const tempLocations = locations.map(l => Object.assign({}, l));
               tempLocations[index] = response.data;
               tempLocations[index]["downvoted"] = true;
               setLocations(tempLocations);
            }
         })
         .catch((error) => console.log(error));
      }
    }

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
        {locations.map((pin, index) => (
          <p style={{ outlineStyle: "groove", outlineColor: pin.color }}>
            <p style={{ fontSize: 20 }}> {pin.title}</p>
            <div>{pin.description}</div>
            <div style={{ float: "right", margin: 1 }}>
              <ThumbsUp onClick={() => upvoteLocation(index)}/> {pin.upvotes} <ThumbsDown onClick={() => downvoteLocation(index)}/> {pin.downvotes}{" "}
            </div>
            <p style={{ color: pin.color }}>Type: {pin.pinType}</p>
          </p>
        ))}
      </p>
    </div>
  );
}
export default ListView;
