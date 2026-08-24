import { FiArrowRight, FiCompass, FiHome, FiMapPin } from "react-icons/fi";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

const NotFound = () => {
	return (
		<main className="not-found-page">
			<Navbar />

			<section className="not-found-content" aria-labelledby="not-found-title">
				<div className="not-found-copy">
					<div className="not-found-kicker">
						<FiMapPin aria-hidden="true" />
						<span>Off the itinerary</span>
					</div>
					<p className="not-found-code">404</p>
					<h1 id="not-found-title">This destination doesn&apos;t exist.</h1>
					<p className="not-found-description">
						The page you&apos;re looking for may have moved, or the link may have taken
						a wrong turn. Let&apos;s get your journey back on course.
					</p>
					<div className="not-found-actions">
						<Link className="primary not-found-button" to="/">
							<FiHome aria-hidden="true" />
							Back to home
						</Link>
						<Link className="secondary not-found-button" to="/destinations">
							Explore destinations
							<FiArrowRight aria-hidden="true" />
						</Link>
					</div>
				</div>

				<div className="not-found-visual" aria-hidden="true">
					<div className="not-found-orbit not-found-orbit-large" />
					<div className="not-found-orbit not-found-orbit-small" />
					<div className="not-found-compass">
						<FiCompass />
					</div>
					<span className="not-found-coordinate not-found-coordinate-top">N 40° 42&apos;</span>
					<span className="not-found-coordinate not-found-coordinate-bottom">W 74° 00&apos;</span>
					<span className="not-found-route-dot not-found-route-dot-one" />
					<span className="not-found-route-dot not-found-route-dot-two" />
				</div>
			</section>
		</main>
	);
};

export default NotFound;
