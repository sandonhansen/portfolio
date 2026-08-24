import headshot from '../assets/sandon-hansen-headshot.png'
import SiteFooter from '../components/SiteFooter'
import LogoMarquee from '../components/LogoMarquee'
import './about.css'

function About() {
  return (
    <div className="wrap">
      <header className="head">
        <div className="bio">
          <div className="eyebrow">The short version</div>
          <h1>Sandon Hansen</h1>
          <p className="body">Quickly is a B2B early-payment platform connecting buyers and suppliers — the product I've spent the better part of a decade inside, and the reason most of what I know about designing for trust, speed, and clarity is hard-won rather than theoretical. As the founding and only designer, I shaped every surface a buyer or supplier touches: onboarding, lists, invoices, and the quieter moments in between where confidence either builds or breaks.</p>
          <p className="body">I care about work that holds up under real use. That means watching how people actually move through a product, naming the friction before it becomes a ticket, and making the case for focused change — even when the problem isn't on the roadmap yet. I've driven decisions above my title when the research and the behavior pointed the same way, including retiring patterns that no longer matched how our users worked.</p>
          <p className="body">Outside the Figma file, I prototype in code. High-fidelity, interactive builds in Cursor close the gap between design and engineering, so what ships looks and feels like what we agreed on. I'm looking for teams that want a designer who can run the whole thing: strategy, craft, and the prototypes that make the next step obvious.</p>
          <p className="body muted">Based in Calgary, AB · open to full-time or fractional roles · happy to talk about what you're building.</p>
        </div>
        <div className="photo">
          <img src={headshot} alt="Sandon Hansen" />
        </div>
      </header>

      <section className="marquee-block">
        <div className="eyebrow">Tools</div>
        <LogoMarquee />
      </section>

      <section>
        <div className="eyebrow">What I do</div>
        <div className="caps">
          <div className="col">
            <div className="k">Disciplines</div>
            <ul>
              <li>Product strategy</li>
              <li>UX &amp; interaction design</li>
              <li>UI &amp; visual design</li>
              <li>Prototyping in code</li>
              <li>Research &amp; UX copy</li>
            </ul>
          </div>
          <div className="col">
            <div className="k">Tools</div>
            <ul>
              <li>Figma</li>
              <li>React &amp; Tailwind</li>
              <li>Cursor</li>
              <li>HTML / CSS</li>
              <li>[Add any others]</li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default About
