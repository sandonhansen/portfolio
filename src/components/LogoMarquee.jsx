import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LOGOS, LogoTile } from './logo-set'

const AUTO_SCROLL_DURATION_MS = 32000

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reduced
}

function LogoMarquee() {
  const reducedMotion = usePrefersReducedMotion()
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const boundsRef = useRef({ min: 0, max: 0 })
  const loopWidthRef = useRef(0)
  const offsetRef = useRef(0)
  const dragRef = useRef(null)
  const velocityRef = useRef(0)
  const frameRef = useRef(null)
  const hoverPausedRef = useRef(false)
  const interactingRef = useRef(false)
  const autoScrollFrameRef = useRef(null)
  const wheelResumeTimerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const sequence = useMemo(
    () => [0, 1, 2].flatMap((copy) =>
      LOGOS.map((logo) => ({ ...logo, id: `${copy}-${logo.key}` }))
    ),
    []
  )

  const updateBounds = useCallback(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const viewportWidth = viewport.clientWidth
    const trackWidth = track.scrollWidth
    const min = Math.min(0, viewportWidth - trackWidth)
    boundsRef.current = { min, max: 0 }
    loopWidthRef.current = trackWidth / 3
    offsetRef.current = clamp(offsetRef.current, min, 0)
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
  }, [])

  const normalizeLoopOffset = useCallback(() => {
    const loopWidth = loopWidthRef.current
    if (loopWidth <= 0) return

    let next = offsetRef.current
    while (next <= -loopWidth) next += loopWidth
    while (next > 0) next -= loopWidth
    offsetRef.current = next

    const track = trackRef.current
    if (track) {
      track.style.transform = `translate3d(${next}px, 0, 0)`
    }
  }, [])

  const applyOffset = useCallback((nextOffset) => {
    const { min, max } = boundsRef.current
    const clamped = clamp(nextOffset, min, max)
    offsetRef.current = clamped

    const track = trackRef.current
    if (track) {
      track.style.transform = `translate3d(${clamped}px, 0, 0)`
    }
  }, [])

  const stopMomentum = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [])

  const startMomentum = useCallback(() => {
    stopMomentum()
    interactingRef.current = true

    const step = () => {
      velocityRef.current *= 0.92
      if (Math.abs(velocityRef.current) < 0.25) {
        velocityRef.current = 0
        frameRef.current = null
        interactingRef.current = false
        normalizeLoopOffset()
        return
      }

      applyOffset(offsetRef.current + velocityRef.current)
      frameRef.current = requestAnimationFrame(step)
    }

    if (Math.abs(velocityRef.current) >= 0.25) {
      frameRef.current = requestAnimationFrame(step)
    } else {
      interactingRef.current = false
      normalizeLoopOffset()
    }
  }, [applyOffset, normalizeLoopOffset, stopMomentum])

  const onPointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    stopMomentum()
    interactingRef.current = true
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: offsetRef.current,
      lastX: event.clientX,
      lastTime: event.timeStamp,
    }
    setIsDragging(true)
    viewportRef.current?.setPointerCapture(event.pointerId)
    event.preventDefault()
  }, [stopMomentum])

  const onPointerMove = useCallback((event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const delta = event.clientX - drag.startX
    applyOffset(drag.startOffset + delta)

    const dt = Math.max(event.timeStamp - drag.lastTime, 1)
    velocityRef.current = (event.clientX - drag.lastX) / dt * 16
    drag.lastX = event.clientX
    drag.lastTime = event.timeStamp
  }, [applyOffset])

  const endDrag = useCallback((event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    dragRef.current = null
    setIsDragging(false)
    viewportRef.current?.releasePointerCapture(event.pointerId)

    if (!reducedMotion) {
      startMomentum()
    } else {
      interactingRef.current = false
      normalizeLoopOffset()
    }
  }, [normalizeLoopOffset, reducedMotion, startMomentum])

  const onWheel = useCallback((event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return

    event.preventDefault()
    stopMomentum()
    interactingRef.current = true
    applyOffset(offsetRef.current - event.deltaX)

    if (wheelResumeTimerRef.current !== null) {
      window.clearTimeout(wheelResumeTimerRef.current)
    }
    wheelResumeTimerRef.current = window.setTimeout(() => {
      wheelResumeTimerRef.current = null
      interactingRef.current = false
      normalizeLoopOffset()
    }, 180)
  }, [applyOffset, normalizeLoopOffset, stopMomentum])

  useEffect(() => {
    if (reducedMotion) return undefined

    let lastTime = performance.now()

    const tick = (now) => {
      const loopWidth = loopWidthRef.current
      const shouldAutoScroll = loopWidth > 0
        && !hoverPausedRef.current
        && !interactingRef.current
        && !dragRef.current

      if (shouldAutoScroll) {
        const dt = Math.min(now - lastTime, 48)
        const speed = loopWidth / AUTO_SCROLL_DURATION_MS
        let next = offsetRef.current - speed * dt

        while (next <= -loopWidth) next += loopWidth

        offsetRef.current = next
        const track = trackRef.current
        if (track) {
          track.style.transform = `translate3d(${next}px, 0, 0)`
        }
      }

      lastTime = now
      autoScrollFrameRef.current = requestAnimationFrame(tick)
    }

    autoScrollFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (autoScrollFrameRef.current !== null) {
        cancelAnimationFrame(autoScrollFrameRef.current)
      }
    }
  }, [reducedMotion])

  useEffect(() => {
    updateBounds()

    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return undefined

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          updateBounds()
        })
      : null

    resizeObserver?.observe(viewport)
    resizeObserver?.observe(track)

    return () => {
      resizeObserver?.disconnect()
      stopMomentum()
      if (wheelResumeTimerRef.current !== null) {
        window.clearTimeout(wheelResumeTimerRef.current)
      }
    }
  }, [stopMomentum, updateBounds])

  return (
    <div
      ref={viewportRef}
      className={`logo-marquee logo-marquee-viewport relative w-full touch-none select-none ${isDragging ? 'is-dragging' : ''}`}
      aria-label="Tools and platforms"
      onMouseEnter={() => { hoverPausedRef.current = true }}
      onMouseLeave={() => { hoverPausedRef.current = false }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
    >
      <div ref={trackRef} className="logo-marquee-track flex w-max items-start py-1">
        {sequence.map((logo) => (
          <LogoTile key={logo.id} label={logo.label}>
            {logo.render()}
          </LogoTile>
        ))}
      </div>
    </div>
  )
}

export default LogoMarquee
