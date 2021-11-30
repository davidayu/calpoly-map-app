import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import { Link } from "react-router-dom";
import { ReactComponent as ThumbsUp } from "../icons/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "../icons/thumbs-down.svg";
import { ReactComponent as StudyIcon } from "../icons/study.svg";
import { ReactComponent as ArtIcon } from "../icons/brush.svg";
import { ReactComponent as DiningIcon } from "../icons/eating.svg";
import { ReactComponent as GenericIcon } from "../icons/marker.svg";
import { ReactComponent as MaximizeIcon } from "../icons/maximize.svg";
import { pinTypesMap } from "../pinTypes.js";
import style from "../styles/Pin.module.css";

function Pin(props) {
  useMapEvents(
    props.handleMapClick === undefined
      ? {}
      : {
          click: (event) => props.handleMapClick(event.latlng),
        }
  );

  function TypeIcon(props) {
    switch (props.type) {
      case "STUDY":
        return (
          <StudyIcon
            className={style.popupSubicon}
            title={pinTypesMap[props.type]["text"]}
          />
        );
      case "ART":
        return (
          <ArtIcon
            className={style.popupSubicon}
            title={pinTypesMap[props.type]["text"]}
          />
        );
      case "DINING":
        return (
          <DiningIcon
            className={style.popupSubicon}
            title={pinTypesMap[props.type]["text"]}
          />
        );
      default:
        return <GenericIcon className={style.popupSubicon} />;
    }
  }

  return props.position === null ? null : (
    <Marker
      position={props.position}
      icon={
        new Icon({
          iconUrl: pinTypesMap[props.type]["iconUrl"],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [13, 41],
        })
      }
    >
      {props.id === undefined ? null : (
        <Popup>
          <div className={style.popup}>
            <div className={style.popupTopBar}>
              <h2>{props.title}</h2>
              <TypeIcon type={props.type} />
            </div>
            <p>{props.description}</p>
            <div className={style.popupBottomBar}>
              <ThumbsUp className={style.popupSubicon} title="Upvotes" />
              <span>{props.upvotes}</span>
              <ThumbsDown className={style.popupSubicon} title="Downvotes" />
              <span>{props.downvotes}</span>
              <Link
                className={style.expandIconWrapper}
                to="locations/INSERT_ID_HERE"
              >
                <MaximizeIcon className={style.expandIcon} />
              </Link>
            </div>
          </div>
        </Popup>
      )}
    </Marker>
  );
}

export default Pin;
