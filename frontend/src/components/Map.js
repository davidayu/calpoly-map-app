import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";
import { pinTypesMap } from "../pinTypes.js";

function Map(props) {

  function enumeratePins() {
    if (props.pins)
      return props.pins.map((pin) => (
        <Pin
          key={pin._id}
          id={pin._id}
          position={[pin.lat, pin.lon]}
          title={pin.title}
          description={pin.description}
          type={pin.pinType}
          upvotes={pin.upvotes}
          downvotes={pin.downvotes}
          iconUrl={pinTypesMap[pin.pinType]["iconUrl"]}
        />
      ));
    else if (props.handleMapClick)
      return (
        <Pin
          position={props.newPinPosition}
          handleMapClick={props.handleMapClick}
          iconUrl={"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png"}
        />
      );
  }

  return (
    <div className="map__container">
      <MapContainer
        center={props.center}
        zoom={15}
        zoomControl={false}
        minZoom={4}
        maxZoom={18}
        style={{
          height: props.height,
          width: props.width,
        }}
      >
        {enumeratePins()}
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </div>
  );
}

export default Map;
