import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

import "leaflet/dist/leaflet.css";

const TripMap = ({ lat, lon, places = [] }) => {
  if (!lat || !lon) {
    return (
      <div className="map-unavailable" role="status">
        <FaMapMarkerAlt />
        <strong>Location unavailable</strong>
        <span>Try returning to your itinerary and searching again.</span>
      </div>
    );
  }

  return (
    <MapContainer
      center={[Number(lat), Number(lon)]}
      zoom={12}
      className="leaflet-trip-map"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Destination */}
      <Marker position={[Number(lat), Number(lon)]}>
        <Popup>
          <strong>Your destination</strong>
        </Popup>
      </Marker>

      {/* Famous places */}
      {places.map((place) => (
        <Marker
          key={place.fsq_place_id}
          position={[
            Number(place.latitude),
            Number(place.longitude),
          ]}
        >
          <Popup>
            <strong>{place.name}</strong>
            <br />

            {place.location?.formatted_address ||
              place.location?.address ||
              ""}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TripMap;