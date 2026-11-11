import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Maximize, Minimize } from 'lucide-react'
import { REEL_SLIDES } from '../data/work'

function home() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % REEL_SLIDES.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const collapseOnDesktop = () => {
      if (!mq.matches) setExpanded(false)
    }
    collapseOnDesktop()
    mq.addEventListener('change', collapseOnDesktop)
    return () => mq.removeEventListener('change', collapseOnDesktop)
  }, [])

  useEffect(() => {
    if (!expanded) return

    const onKey = (e) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    document.addEventListener('keydown', onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [expanded])

  const slide = REEL_SLIDES[active]

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

      <div className={`hero-right${expanded ? ' is-expanded' : ''}`}>
        <div className="reel" aria-live="polite" aria-atomic="true">
          {REEL_SLIDES.map((s, i) => (
            <div
              key={`${s.k}-${s.h}`}
              className={`slide ${s.tone}${i === active ? ' is-active' : ''}`}
              aria-hidden={i !== active}
            />
          ))}
          <button
            type="button"
            className="reel-expand"
            aria-label={expanded ? 'Collapse project panel' : 'Expand project panel'}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? (
              <Minimize size={18} strokeWidth={2.25} aria-hidden="true" />
            ) : (
              <Maximize size={18} strokeWidth={2.25} aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="reel-meta">
          <div className="reel-title">
            <div className="k">{slide.k}</div>
            <div className="h">{slide.h}</div>
          </div>
          <Link className="cta" to="/work">
            View work
            <ArrowUpRight className="arr" size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default home
