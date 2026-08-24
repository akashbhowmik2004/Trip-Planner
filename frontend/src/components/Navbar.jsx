import { Link } from 'react-router'
const Navbar = () => {
  return (
    <header className="topbar">
        <div className="brand">
          <span className="brand-mark">✈</span>
          <span>Trip Planner</span>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/destinations">Destinations</a>
          <a href="/offers">Offers</a>
          <a href="/about">About</a>
        </nav>

        <Link to="/plan-trip">
          <button className="nav-cta">Plan a trip</button>
        </Link>
      </header>
  )
}

export default Navbar
