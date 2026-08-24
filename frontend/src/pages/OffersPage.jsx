import { Link } from "react-router";
import Navbar from "../components/Navbar.jsx";

const offers = [
  {
    title: "Island reset",
    destination: "Bali, Indonesia",
    detail: "7 nights, boutique stay, and a private sunset cruise.",
    price: "₹70,000",
    tag: "Save 20%",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "European weekend",
    destination: "Paris, France",
    detail: "4 nights near the city centre with a museum pass included.",
    price: "₹50,240",
    tag: "City favourite",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Alpine escape",
    destination: "Swiss Alps",
    detail: "5 nights, rail transfers, and a guided mountain day.",
    price: "₹80,330",
    tag: "Limited dates",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
];

const OffersPage = () => {
  return (
    <div className="offers-page">
      <Navbar />

      <main>
        <section className="offers-header">
          <div>
            <p className="eyebrow">Go further for less</p>
            <h1>Offers worth packing for.</h1>
            <p className="subtitle">
              Thoughtful escapes, better rates, and a little more room in your
              travel budget.
            </p>
          </div>
          <div className="offers-note">
            <span className="offers-note-icon">✦</span>
            <div>
              <strong>Fresh every week</strong>
              <p>Our best seasonal prices are picked by real trip planners.</p>
            </div>
          </div>
        </section>

        <section className="offer-grid" aria-label="Current travel offers">
          {offers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <div
                className="offer-image"
                style={{ backgroundImage: `url(${offer.image})` }}
              >
                <span>{offer.tag}</span>
              </div>
              <div className="offer-body">
                <p className="offer-destination">{offer.destination}</p>
                <h2>{offer.title}</h2>
                <p>{offer.detail}</p>
                <div className="offer-footer">
                  <div>
                    <small>From</small>
                    <strong>{offer.price}</strong>
                  </div>
                  <Link
                    className="secondary offer-link"
                    to="/plan-trip"
                    state={{ offer }}
                  >
                    Plan it
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="offer-banner">
          <div>
            <p className="eyebrow">Make it yours</p>
            <h2>Your next great deal starts with a destination.</h2>
          </div>
          <Link className="primary" to="/destinations">
            Browse destinations
          </Link>
        </section>
      </main>
    </div>
  );
};

export default OffersPage;
