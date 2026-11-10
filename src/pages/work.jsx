import { useEffect, useRef, useState } from 'react'
import { CASE_STUDIES, REEL_SLIDES } from '../data/work'
import SiteFooter from '../components/SiteFooter'
import './work.css'

function ProjectCard({ study }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

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
    <article ref={ref} className={`work-card${visible ? ' is-in' : ''}`}>
      <div className="work-card-preview">
        {study.preview ? (
          <img src={study.preview} alt="" />
        ) : null}
      </div>
      <p className="work-card-writeup">{study.hook}</p>
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
        <div className="work-head-copy">
          <h2 className="work-head-title">Selected work</h2>
          <p className="work-head-desc">
            Below is a small cross‑section of relevant work that I can share. I&apos;m happy to walk through my process and discuss these examples, get in touch to learn more.
          </p>
        </div>
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
