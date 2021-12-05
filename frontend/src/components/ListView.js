import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as Close } from "../icons/close.svg";
import { ReactComponent as ThumbsUp } from "../icons/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "../icons/thumbs-down.svg";
import { ReactComponent as StudyIcon } from "../icons/study.svg";
import { ReactComponent as ArtIcon } from "../icons/brush.svg";
import { ReactComponent as DiningIcon } from "../icons/eating.svg";
import { ReactComponent as GenericIcon } from "../icons/marker.svg";
import { ReactComponent as MaximizeIcon } from "../icons/maximize.svg";
import { pinTypesMap } from "../pinTypes.js";
import { Link, useNavigate } from "react-router-dom";
import style from "../styles/ListView.module.css";

function ListView() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllPins().then((result) => {
      if (result) setLocations(result.data.pins_list);
      console.log(result.data);
    });
  }, []);

  async function getAllPins() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/pins`
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function TypeIcon(props) {
    switch (props.type) {
      case "STUDY":
        return (
          <StudyIcon
            className={style.cardSubicon}
            title={pinTypesMap[props.type]["text"]}
          />
        );
      case "ART":
        return (
          <ArtIcon
            className={style.cardSubicon}
            title={pinTypesMap[props.type]["text"]}
          />
        );
      case "DINING":
        return (
          <DiningIcon
            className={style.cardSubicon}
            title={pinTypesMap[props.type]["text"]}
          />
        );
      default:
        return <GenericIcon className={style.cardSubicon} />;
    }
  }

  function upvoteLocation(index) {
    const id = locations[index]["_id"];
    if (locations[index]["upvoted"]) {
      axios
        .patch(`${process.env.REACT_APP_API_HOST}/pins/${id}/upvotes?undo=true`)
        .then((response) => {
          if (response && response.status === 201) {
            const tempLocations = locations.map((l) => Object.assign({}, l));
            tempLocations[index] = response.data;
            tempLocations[index]["upvoted"] = false;
            setLocations(tempLocations);
          }
        })
        .catch((error) => console.log(error));
    } else if (!locations[index]["upvoted"] && !locations[index]["downvoted"]) {
      axios
        .patch(`${process.env.REACT_APP_API_HOST}/pins/${id}/upvotes`)
        .then((response) => {
          if (response && response.status === 201) {
            const tempLocations = locations.map((l) => Object.assign({}, l));
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
        .patch(
          `${process.env.REACT_APP_API_HOST}/pins/${id}/downvotes?undo=true`
        )
        .then((response) => {
          if (response && response.status === 201) {
            const tempLocations = locations.map((l) => Object.assign({}, l));
            tempLocations[index] = response.data;
            tempLocations[index]["downvoted"] = false;
            setLocations(tempLocations);
          }
        })
        .catch((error) => console.log(error));
    } else if (!locations[index]["upvoted"] && !locations[index]["downvoted"]) {
      axios
        .patch(`${process.env.REACT_APP_API_HOST}/pins/${id}/downvotes`)
        .then((response) => {
          if (response && response.status === 201) {
            const tempLocations = locations.map((l) => Object.assign({}, l));
            tempLocations[index] = response.data;
            tempLocations[index]["downvoted"] = true;
            setLocations(tempLocations);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className={style.listView}>
      <div className={style.header}>
        <h2>Locations</h2>
        <button className={style.iconWrapper} onClick={() => navigate(-1)}>
          <Close className={style.icon} />
        </button>
      </div>
      <div class={style.locationsWrapper}>
        <div className={style.locations}>
          {locations.map((pin, index) => (
            <div className={style.locationCard}>
              <div className={style.cardTopRow}>
                <h4> {pin.title}</h4>
                <TypeIcon type={pin.pinType} />
              </div>
              <p>{pin.description}</p>
              <div className={style.cardBottomRow}>
                <button
                  className={
                    style.cardIconWrapper +
                    (pin.upvoted ? " " + style.iconSelected : "")
                  }
                  onClick={() => upvoteLocation(index)}
                >
                  <ThumbsUp className={style.cardIcon} />
                </button>
                <span>{pin.upvotes}</span>
                <button
                  className={
                    style.cardIconWrapper +
                    (pin.downvoted ? " " + style.iconSelected : "")
                  }
                  onClick={() => downvoteLocation(index)}
                >
                  <ThumbsDown className={style.cardIcon} />
                </button>
                <span>{pin.downvotes}</span>

                <Link
                  className={style.cardIconWrapper + " " + style.maximizeIcon}
                  to={`${pin._id}`}
                >
                  <MaximizeIcon className={style.cardIcon} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ListView;
