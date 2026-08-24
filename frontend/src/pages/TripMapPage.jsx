import { Link, useLocation } from "react-router";
import {
  FaArrowLeft,
  FaChevronRight,
  FaClock,
  FaCompass,
  FaMapMarkerAlt,
  FaRoute,
  FaWalking,
} from "react-icons/fa";
import TripMap from "../components/TripMap";
import Navbar from "../components/Navbar.jsx";

const TripMapPage = () => {
  const location = useLocation();

  const {
    tripData,
    countryDetails,
    famousPlaces,
  } = location.state || {};

  const destination = tripData?.destination || countryDetails?.name || "Your trip";
  const places = famousPlaces || [];

  return (
    <>
      <Navbar />
      <main className="trip-map-page">
        <header className="trip-map-header">
          <div>
            <Link className="back-link" to="/trip-details" state={tripData}>
              <FaArrowLeft /> Back to itinerary
            </Link>
            <div className="trip-map-title-row">
              <div>
                <p className="eyebrow">Explore your route</p>
                <h1>{destination}</h1>
              </div>
              <span className="map-live-badge"><span /> Live map</span>
            </div>
            <p className="trip-map-subtitle">
              Find your way through the places that make this trip yours.
            </p>
          </div>
          <div className="map-trip-meta">
            <span><FaClock /> {places.length || 0} places found</span>
            <span><FaRoute /> Explore at your pace</span>
          </div>
        </header>

        <section className="trip-map-layout">
          <aside className="map-itinerary">
            <div className="map-itinerary-heading">
              <div>
                <p className="eyebrow">Your places</p>
                <h2>Worth the stop</h2>
              </div>
              <span className="stop-count">{places.length}</span>
            </div>
            <div className="map-place-list">
              {places.slice(0, 6).map((place, index) => (
                <article className="map-place" key={place.fsq_place_id || place.name || index}>
                  <span className="map-place-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="map-place-copy">
                    <strong>{place.name}</strong>
                    <small>{place.location?.formatted_address || place.location?.address || "Local highlight"}</small>
                  </div>
                  <FaChevronRight />
                </article>
              ))}
              {places.length === 0 && (
                <div className="map-empty-state">
                  <FaCompass />
                  <strong>Places are on their way</strong>
                  <span>We could not find stops for this destination yet.</span>
                </div>
              )}
            </div>
            <div className="map-legend">
              <span><i className="legend-destination" /> Destination</span>
              <span><i className="legend-place" /> Places to visit</span>
            </div>
          </aside>

          <div className="map-view-panel">
            <div className="map-view-toolbar">
              <span><FaMapMarkerAlt /> {destination}</span>
              <button type="button" aria-label="Walking directions"><FaWalking /> <span>Walking route</span></button>
            </div>
            <TripMap lat={countryDetails?.lat} lon={countryDetails?.lon} places={places} />
          </div>
        </section>

        <footer className="trip-map-footer">
          <span><FaMapMarkerAlt /> Map data by OpenStreetMap</span>
          <Link to="/plan-trip">Plan another route <FaChevronRight /></Link>
        </footer>
      </main>
    </>
  );
};
export default TripMapPage;