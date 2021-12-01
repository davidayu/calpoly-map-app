import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { ReactComponent as ThumbsUp } from "./svg/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "./svg/thumbs-down.svg";

function Pin(props) {
  useMapEvents(
    props.handleMapClick === undefined
      ? {}
      : {
          click: (event) => props.handleMapClick(event.latlng),
        }
  );

  return props.position === null ? null : (
    <Marker
      position={props.position}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [13, 41],
        })
      }
    >
      {props.id === undefined ? null : (
        <Popup>
          <h5>{props.title}</h5>
          <p>{props.description}</p>
          <ThumbsUp title="Upvotes" />
          <span>{props.upvotes}</span>
          <ThumbsDown title="Downvotes" />
          <span>{props.downvotes}</span>
        </Popup>
      )}
    </Marker>
  );
}

export default Pin;
