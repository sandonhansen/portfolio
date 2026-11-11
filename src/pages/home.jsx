import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Maximize, Minimize } from 'lucide-react'
import { REEL_SLIDES } from '../data/work'

const EXPAND_MS = 460
const EXPAND_EASE = 'cubic-bezier(0.22, 0.8, 0.2, 1)'

function home() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const panelRef = useRef(null)
  const slotRef = useRef(null)
  const busyRef = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % REEL_SLIDES.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function applyFrame(el, rect) {
    el.style.top = `${rect.top}px`
    el.style.left = `${rect.left}px`
    el.style.width = `${rect.width}px`
    el.style.height = `${rect.height}px`
  }

  function clearFrame(el) {
    el.style.top = ''
    el.style.left = ''
    el.style.width = ''
    el.style.height = ''
    el.style.transition = ''
    el.style.padding = ''
    el.style.borderRadius = ''
  }

  function frameTransition(el) {
    el.style.transition = [
      `top ${EXPAND_MS}ms ${EXPAND_EASE}`,
      `left ${EXPAND_MS}ms ${EXPAND_EASE}`,
      `width ${EXPAND_MS}ms ${EXPAND_EASE}`,
      `height ${EXPAND_MS}ms ${EXPAND_EASE}`,
      `padding ${EXPAND_MS}ms ${EXPAND_EASE}`,
      `border-radius ${EXPAND_MS}ms ${EXPAND_EASE}`,
    ].join(', ')
  }

  function waitForFrame(el) {
    return new Promise((resolve) => {
      let settled = false
      const finish = () => {
        if (settled) return
        settled = true
        el.removeEventListener('transitionend', onEnd)
        window.clearTimeout(timer)
        resolve()
      }
      const onEnd = (e) => {
        if (e.target !== el) return
        if (e.propertyName !== 'width' && e.propertyName !== 'height') return
        finish()
      }
      el.addEventListener('transitionend', onEnd)
      const timer = window.setTimeout(finish, EXPAND_MS + 80)
    })
  }

  function resetExpanded() {
    const panel = panelRef.current
    const slot = slotRef.current
    if (panel) {
      panel.classList.remove('is-expand-layer', 'is-expanded')
      clearFrame(panel)
    }
    if (slot) {
      slot.style.height = ''
      slot.style.minHeight = ''
    }
    busyRef.current = false
    setExpanded(false)
  }

  async function toggleExpand(next = !expanded) {
    const panel = panelRef.current
    const slot = slotRef.current
    if (!panel || !slot || busyRef.current) return
    if (next === expanded) return

    busyRef.current = true
    const reduce = prefersReducedMotion()
    const reel = panel.querySelector('.reel')
    const reelRadius = reel ? getComputedStyle(reel).borderRadius : '16px'

    if (next) {
      const first = panel.getBoundingClientRect()
      slot.style.height = `${first.height}px`
      slot.style.minHeight = `${first.height}px`

      panel.classList.add('is-expand-layer')
      applyFrame(panel, first)
      panel.style.padding = '0px'
      panel.style.borderRadius = reelRadius

      if (reduce) {
        panel.classList.add('is-expanded')
        panel.style.top = '0px'
        panel.style.left = '0px'
        panel.style.width = '100%'
        panel.style.height = '100%'
        panel.style.padding = ''
        panel.style.borderRadius = ''
        setExpanded(true)
        busyRef.current = false
        return
      }

      panel.getBoundingClientRect()
      frameTransition(panel)
      panel.classList.add('is-expanded')
      panel.style.top = '0px'
      panel.style.left = '0px'
      panel.style.width = '100%'
      panel.style.height = '100%'
      panel.style.padding = ''
      panel.style.borderRadius = '0px'
      setExpanded(true)
      await waitForFrame(panel)
      busyRef.current = false
      return
    }

    const target = slot.getBoundingClientRect()

    if (reduce) {
      resetExpanded()
      return
    }

    frameTransition(panel)
    panel.classList.remove('is-expanded')
    applyFrame(panel, target)
    panel.style.padding = '0px'
    panel.style.borderRadius = reelRadius

    await waitForFrame(panel)
    panel.classList.remove('is-expand-layer')
    clearFrame(panel)
    slot.style.height = ''
    slot.style.minHeight = ''
    setExpanded(false)
    busyRef.current = false
  }

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const collapseOnDesktop = () => {
      if (!mq.matches) resetExpanded()
    }
    mq.addEventListener('change', collapseOnDesktop)
    return () => mq.removeEventListener('change', collapseOnDesktop)
  }, [])

  useEffect(() => {
    if (!expanded) return

    const onKey = (e) => {
      if (e.key === 'Escape') void toggleExpand(false)
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

      <div className="hero-right-slot" ref={slotRef}>
        <div className="hero-right" ref={panelRef}>
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
              onClick={() => toggleExpand()}
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
    </div>
  )
}

export default home
