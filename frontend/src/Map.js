import { MapContainer, TileLayer } from "react-leaflet";
import Pin from './Pin'

function Map(props) {

   const defaultPosition = [35.3, -120.66];

   return (
      <div className="map__container">
         <MapContainer
            center={defaultPosition}
            zoom={14}
            style={{
               height:"65vh",
            }}
         >
         <Pin position={props.position} handleMapClick={props.handleMapClick} />
         <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         </MapContainer>
      </div>
   );

}

export default Map;
