import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, CopySimple } from '@phosphor-icons/react'

const LINKS = [
  { to: '/', end: true, label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
]

const EMAIL = 'sandonhansen@gmail.com'
const LINKEDIN_URL = '#'
const RESUME_URL = '/resume.pdf'

function ConnectMenu({ onOpenChange }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const rootRef = useRef(null)

  const setMenuOpen = (next) => {
    setOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (!open) {
      setCopied(false)
      return
    }

    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setMenuOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(id)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={`connect-menu${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className={`connect-trigger${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setMenuOpen(!open)}
      >
        Connect
      </button>

      <div
        className={`connect-dropdown${open ? ' is-open' : ''}`}
        role="menu"
        aria-label="Connect"
        aria-hidden={!open}
      >
        <a
          role="menuitem"
          className="connect-item"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          LinkedIn
          <ArrowUpRight className="connect-item-arr" size={14} weight="bold" aria-hidden="true" />
        </a>
        <a
          role="menuitem"
          className="connect-item"
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          Resume
          <ArrowUpRight className="connect-item-arr" size={14} weight="bold" aria-hidden="true" />
        </a>
        <button
          type="button"
          role="menuitem"
          className={`connect-item${copied ? ' is-copied' : ''}`}
          tabIndex={open ? 0 : -1}
          onClick={copyEmail}
        >
          {copied ? 'Email copied' : 'Copy email address'}
          {copied ? (
            <Check className="connect-item-arr" size={14} weight="bold" aria-hidden="true" />
          ) : (
            <CopySimple className="connect-item-arr" size={14} weight="bold" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  )
}

function TopBar() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme')
        || document.documentElement.dataset.theme
        || 'dark'
    } catch {
      return 'dark'
    }
  })
  const navRef = useRef(null)
  const location = useLocation()
  const [connectOpen, setConnectOpen] = useState(false)
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  const updatePill = () => {
    const nav = navRef.current
    if (!nav) return
    const active =
      nav.querySelector('.connect-trigger.is-open') ||
      nav.querySelector('a.active')
    if (!active) return

    const navRect = nav.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()

    setPill({
      left: Math.round(activeRect.left - navRect.left),
      width: Math.round(activeRect.width),
      ready: true,
    })
  }

  useLayoutEffect(() => {
    updatePill()
  }, [location.pathname, connectOpen])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onResize = () => updatePill()
    window.addEventListener('resize', onResize)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null
    ro?.observe(nav)
    return () => {
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
    }
  }, [])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="top">
      <div className="brandtag"><b>Sandon Hansen</b><br />Product x Design</div>
      <div className="cluster">
        <nav ref={navRef} aria-label="Primary">
          <span
            className="nav-pill"
            aria-hidden="true"
            style={{
              width: pill.width,
              transform: `translateX(${pill.left}px)`,
              opacity: pill.ready ? 1 : 0,
            }}
          />
          {LINKS.map(({ to, end, label }) => (
            <NavLink key={to} to={to} end={end}>{label}</NavLink>
          ))}
          <ConnectMenu onOpenChange={setConnectOpen} />
        </nav>
        <button type="button" className="tbtn" onClick={toggle}
          aria-label="Switch between light and dark mode">
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 13.5A8 8 0 1 1 10.5 3.5a6.2 6.2 0 0 0 10 10z" /></svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default TopBar
