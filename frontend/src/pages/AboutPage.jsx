import { Link } from 'react-router'
import Navbar from '../components/Navbar.jsx'

const values = [
  {
    icon: '◎',
    title: 'Curated, not crowded',
    text: 'We focus on places and stays with a sense of place, so every recommendation feels considered.',
  },
  {
    icon: '↗',
    title: 'Plans that flex',
    text: 'Change your pace, swap an activity, or follow a new idea without rebuilding the whole trip.',
  },
  {
    icon: '♡',
    title: 'People on your side',
    text: 'Helpful support from the first idea to the last boarding pass, whenever you need it.',
  },
]

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />

      <main>
        <section className="about-intro">
          <div className="about-copy">
            <p className="eyebrow">Travel, made human</p>
            <h1>More moments. Less planning noise.</h1>
            <p className="subtitle">
              Trip Planner helps curious people turn a loose idea into a trip that feels unmistakably theirs.
            </p>
            <Link className="primary about-cta" to="/plan-trip">Start planning</Link>
          </div>
          <div className="about-photo" aria-label="A traveller looking out across a coastline" />
        </section>

        <section className="about-story">
          <div>
            <p className="eyebrow">Why we exist</p>
            <h2>The best trips leave space for the unexpected.</h2>
          </div>
          <p>
            We built Trip Planner for the gap between inspiration and booking. Instead of endless tabs and
            generic itineraries, you get a clear starting point, useful ideas, and the freedom to shape the
            journey as you go.
          </p>
        </section>

        <section className="value-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Our approach</p>
              <h2>Designed around the way you travel.</h2>
            </div>
          </div>
          <div className="value-grid">
            {values.map((value) => (
              <article className="value-card" key={value.title}>
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-stats" aria-label="Trip Planner facts">
          <div><strong>120+</strong><span>destinations</span></div>
          <div><strong>4.9/5</strong><span>traveller rating</span></div>
          <div><strong>24/7</strong><span>human support</span></div>
        </section>
      </main>
    </div>
  )
}

export default AboutPage
