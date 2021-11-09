import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";

function Map(props) {
  const defaultPosition = [35.3, -120.66];

  return (
    <div className="map__container">
      <MapContainer
        center={defaultPosition}
        zoom={14}
        zoomControl={false}
        minZoom={7}
        maxZoom={18}
        style={{
          height: "65vh",
        }}
      >
        {props.searchedPins.map((pin) => (
          <Pin
            key={pin._id}
            id={pin._id}
            position={[pin.lat, pin.lon]}
            title={pin.title}
            description={pin.description}
            type={pin.pinType}
            upvotes={pin.upvotes}
            downvotes={pin.downvotes}
          />
        ))}
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </div>
  );
}

export default Map;
