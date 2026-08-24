import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router";
const destinations = [
  {
    name: "Bali",
    country: "Indonesia",
    price: "₹89,000",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
    tag: "Beach escape",
  },
  {
    name: "Paris",
    country: "France",
    price: "₹1,00,240",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    tag: "City lights",
  },
  {
    name: "Kyoto",
    country: "Japan",
    price: "₹1,00,000",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    tag: "Culture trip",
  },
  {
    name: "Santorini",
    country: "Greece",
    price: "₹90,420",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    tag: "Sunset views",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    price: "₹70,960",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
    tag: "Luxury stay",
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    price: "₹80,330",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    tag: "Mountain retreat",
  },
];

const DestinationsPage = () => {
  return (
    <>
      <Navbar />
      <div className="destinations-page">
        <section className="destinations-header">
          <p className="eyebrow">Discover more</p>
          <h1>Popular destinations</h1>
          <p className="subtitle">
            Explore scenic escapes, city adventures, and relaxing retreats
            curated for every traveler.
          </p>
        </section>

        <section className="destination-list">
          {destinations.map((place) => (
            <article key={place.name} className="destination-item">
              <div
                className="destination-image"
                style={{ backgroundImage: `url(${place.image})` }}
              />

              <div className="destination-body">
                <span className="destination-tag">{place.tag}</span>
                <h2>{place.name}</h2>
                <p>{place.country}</p>

                <div className="destination-footer">
                  <span>From {place.price}</span>
                  <Link to="/plan-trip" state={{ destination: place.name }}>
                    <button className="secondary">View trip</button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
};

export default DestinationsPage;
