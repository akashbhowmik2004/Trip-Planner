import { Link } from "react-router";
import Navbar from "../components/Navbar.jsx";
const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      <main className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Explore beyond limits</p>
          <h1>Book your next adventure.</h1>
          <p className="subtitle">
            Discover handpicked escapes, curated stays, and unforgettable
            experiences across the world.
          </p>

          <div className="cta-group">
            <Link to="/plan-trip">
              <button className="primary">Book Now</button>
            </Link>
            <button className="secondary">View Deals</button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>120+</strong>
              <span>Destinations</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Guest rating</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Travel support</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Travel illustration">
          <div className="travel-card main-card">
            <span className="badge">Summer getaway</span>
            <div className="mini-map">
              <span className="dot dot-one"></span>
              <span className="dot dot-two"></span>
              <span className="dot dot-three"></span>
            </div>
            <div className="card-footer">
              <div>
                <small>Next stop</small>
                <strong>Bali</strong>
              </div>
              <span className="price">$899</span>
            </div>
          </div>
        </div>
      </main>

      <section className="feature-strip">
        <div className="feature-card">
          <span className="feature-icon">🏝️</span>
          <div>
            <strong>Beach escapes</strong>
            <small>Sun, sand, and sea</small>
          </div>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🏔️</span>
          <div>
            <strong>Mountain trails</strong>
            <small>Fresh air, epic views</small>
          </div>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🏙️</span>
          <div>
            <strong>City breaks</strong>
            <small>Culture and nightlife</small>
          </div>
        </div>
      </section>

      <section className="destinations">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trending now</p>
            <h2>Popular destinations</h2>
          </div>
          <a href="/destinations">Explore all</a>
        </div>

        <div className="destination-grid">
          <article className="destination-card paris">
            <div className="overlay"></div>
            <div className="content">
              <span>France</span>
              <h3>Paris</h3>
              <p>From $1,240</p>
            </div>
          </article>

          <article className="destination-card bali">
            <div className="overlay"></div>
            <div className="content">
              <span>Indonesia</span>
              <h3>Bali</h3>
              <p>From $890</p>
            </div>
          </article>

          <article className="destination-card kyoto">
            <div className="overlay"></div>
            <div className="content">
              <span>Japan</span>
              <h3>Kyoto</h3>
              <p>From $1,080</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Home;
