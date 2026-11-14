import { useEffect, useRef, useState } from 'react'
import { CASE_STUDIES } from '../data/work'
import ProjectReel from '../components/ProjectReel'
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
  return (
    <div className="work-index">
      <ProjectReel variant="page" />

      <header className="work-head">
        <div className="work-head-copy">
          <h2 className="work-head-title">Selected work</h2>
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
