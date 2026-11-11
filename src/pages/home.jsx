import ProjectReel from '../components/ProjectReel'

function home() {
  return (
    <div className="stage">
      <div className="hero-left">
        <div className="label">Founding Product Designer</div>
        <h1 className="name" aria-label="Sandon">
          <span>S</span><span>A</span><span>N</span><span>D</span><span>O</span><span>N</span>
        </h1>
        <div className="hero-rule" aria-hidden="true" />
        <div className="pitch">
          <div className="l1">Nearly a decade owning product and brand vision, strategy, and execution end-to-end.</div>
          <div className="l2">LLM-first prototyping to ship interfaces that turn system logic complexity into simple, intuitive, and accessible customer experiences.</div>
        </div>
      </div>

      <ProjectReel
        variant="hero"
        hitTo="/work"
        showCta
        ctaTo="/work"
        ctaLabel="View work"
      />
    </div>
  )
}

export default home
