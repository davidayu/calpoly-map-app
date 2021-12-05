import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as Close } from "../icons/close.svg";
import { ReactComponent as ThumbsUp } from "../icons/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "../icons/thumbs-down.svg";
import { useNavigate } from "react-router-dom";

function ListView() {

   const navigate = useNavigate();

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
      <button onClick={() => navigate(-1)} >
         <Close />
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
