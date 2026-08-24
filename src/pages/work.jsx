import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import { CASE_STUDIES, REEL_SLIDES } from '../data/work'
import SiteFooter from '../components/SiteFooter'
import './work.css'

function ProjectCard({ study }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const cover = study.cover ?? study.frames?.[0]
  const hasMetric = Boolean(study.metric?.value && study.metric?.label)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <article ref={ref} className={`project-card${visible ? ' is-in' : ''}`}>
      <div className="project-copy">
        {hasMetric && (
          <div className="metric">
            <div className="val">{study.metric.value}</div>
            <div className="lab">{study.metric.label}</div>
          </div>
        )}
        <div className="eyebrow">{study.eyebrow}</div>
        <h2 className="title">{study.title}</h2>
        <p className="hook">{study.line ?? study.hook}</p>
        <Link className="cta" to={`/work/${study.slug}`}>
          Read case study
          <ArrowUpRight className="arr" size={16} weight="bold" aria-hidden="true" />
        </Link>
      </div>

      <div className="project-media">
        {cover && (
          <div className={`project-screen ${cover.tone}`} aria-hidden="true">
            <span className="tag">{cover.tag}</span>
            <span className="cap">{cover.caption}</span>
          </div>
        )}
      </div>
    </article>
  )
}

function work() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % REEL_SLIDES.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const slide = REEL_SLIDES[active]
  const count = CASE_STUDIES.length
  const countLabel = `${count} case ${count === 1 ? 'study' : 'studies'}`

  return (
    <div className="work-index">
      <section className="showreel" aria-label="Selected work reel">
        <div className="showreel-stage" aria-live="polite" aria-atomic="true">
          {REEL_SLIDES.map((s, i) => (
            <div
              key={`${s.k}-${s.h}`}
              className={`slide ${s.tone}${i === active ? ' is-active' : ''}`}
              aria-hidden={i !== active}
            />
          ))}
        </div>
        <div className="showreel-meta">
          <div className="k">{slide.k}</div>
          <div className="h">{slide.h}</div>
        </div>
      </section>

      <header className="work-head">
        <h2 className="work-head-title">Work</h2>
        <span className="work-head-count">{countLabel}</span>
      </header>

      <div className="project-list">
        {CASE_STUDIES.map((study) => (
          <ProjectCard key={study.slug} study={study} />
        ))}
      </div>

      <SiteFooter />
    </div>
  )
}

export default work
