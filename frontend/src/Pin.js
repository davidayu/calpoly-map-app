import { Marker, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

function Pin(props) {
  useMapEvents({
    click: (event) => {
      props.handleMapClick(event.latlng);
    },
  });

  return props.position === null ? null : (
    <Marker
      position={props.position}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    ></Marker>
  );
}

export default Pin;
