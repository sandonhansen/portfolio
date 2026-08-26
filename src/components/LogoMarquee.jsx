import { useEffect, useState } from 'react'
import { siAsana, siClaude, siCursor, siElevenlabs, siPosthog, siWebflow } from 'simple-icons'
import figmaIcon from 'devicon/icons/figma/figma-original.svg?url'
import reactIcon from 'devicon/icons/react/react-original.svg?url'
import tailwindIcon from 'devicon/icons/tailwindcss/tailwindcss-original.svg?url'
import html5Icon from 'devicon/icons/html5/html5-original.svg?url'
import css3Icon from 'devicon/icons/css3/css3-original.svg?url'
import lovableLogo from '../assets/logo-lovable.svg'
import screenStudioLogo from '../assets/logo-screenstudio.png'
import adobeLogo from '../assets/logo-adobe.svg'
import posthogLogo from '../assets/logo-posthog.svg'

const AMPLITUDE_PATHS = [
  'M225.48,116.24c-1.38-1.82-2.95-2.78-4.7-2.78c-1.44,0-2.75,0.64-3.6,1.19c-13.26,10.42-31.4,54.53-46.27,112.67l13.16,0.15c26,0.29,52.84,0.6,79.38,1.01c-6.99-26.63-13.61-49.45-19.67-67.88C234.92,133.67,228.94,121.61,225.48,116.24z',
  'M254.99,4.15c-137.52,0-249,111.48-249,249c0,137.52,111.48,249,249,249s249-111.48,249-249C503.99,115.63,392.51,4.15,254.99,4.15z M434.04,257.67c-0.02,0.02-0.04,0.03-0.06,0.05c-0.27,0.22-0.54,0.42-0.83,0.62c-0.09,0.06-0.18,0.13-0.28,0.19c-0.19,0.12-0.39,0.24-0.58,0.35c-0.18,0.11-0.36,0.21-0.54,0.31c-0.01,0.01-0.02,0.01-0.03,0.02c-1.83,0.96-3.92,1.51-6.13,1.51c-0.18,0-117.95,0-117.95,0c0.94,3.91,1.97,8.35,3.09,13.18c6.46,27.91,23.64,102.06,41.88,102.06l0.36,0.01l0.2-0.03l0.35,0c14.25,0,21.52-20.6,37.46-65.74l0.19-0.55c2.56-7.25,5.45-15.43,8.58-24.08l0.8-2.21l0.01,0c0.81-2.16,2.89-3.7,5.34-3.7c3.15,0,5.71,2.56,5.71,5.71c0,0.57-0.09,1.12-0.24,1.64l0,0l-0.66,2.22c-1.66,5.37-3.43,12.69-5.47,21.16c-9.5,39.37-23.85,98.85-60.67,98.85l-0.27,0c-23.79-0.19-38.03-38.22-44.11-54.46c-11.37-30.37-19.97-62.73-28.27-94.07H163.34l-22.54,72.14l-0.33-0.26c-2.06,3.24-5.68,5.32-9.67,5.32c-6.29,0-11.44-5.12-11.47-11.41l0.02-0.39l1.36-8.16c3.11-18.54,6.84-37.78,11.1-57.23H85.97l-0.17-0.17c-8.32-1.2-14.71-8.54-14.71-17.1c0-8.39,5.94-15.54,14.12-16.99c0.75-0.1,2.27-0.23,5.36-0.23c0.66,0,1.4,0,2.23,0.02c14.53,0.25,29.95,0.48,46.86,0.7c23.93-97.24,51.65-146.6,82.4-146.74c32.99,0,57.47,75.12,77.06,148.61l0.08,0.29c40.25,0.81,83.15,1.98,124.86,4.97l1.75,0.16c0.67,0.01,1.33,0.08,1.97,0.18l0.24,0.02c0.07,0.01,0.14,0.03,0.21,0.05c0.04,0.01,0.07,0.02,0.11,0.02c6.07,1.22,10.57,6.54,10.57,12.94C438.91,251.55,437.01,255.24,434.04,257.67z',
]

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.dataset.theme || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setTheme(root.dataset.theme || 'dark')
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return theme
}

function DeviconImg({ src }) {
  return <img src={src} alt="" className="h-[30px] w-[30px] object-contain" draggable={false} />
}

function SimpleBrandIcon({ icon, monochrome = false }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[30px] w-[30px]"
      fill={monochrome ? 'currentColor' : `#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  )
}

function RasterLogo({ src }) {
  return <img src={src} alt="" className="h-[30px] w-[30px] object-contain" draggable={false} />
}

function AmplitudeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 504 504"
      aria-hidden="true"
      className="h-[30px] w-[30px] text-[#10069F] dark:text-white"
    >
      {AMPLITUDE_PATHS.map((d) => (
        <path key={d.slice(0, 24)} fill="currentColor" d={d} />
      ))}
    </svg>
  )
}

function PostHogLogo() {
  const theme = useTheme()

  if (theme === 'dark') {
    return <SimpleBrandIcon icon={siPosthog} monochrome />
  }

  return <RasterLogo src={posthogLogo} />
}

const LOGOS = [
  { key: 'figma', label: 'Figma', render: () => <DeviconImg src={figmaIcon} /> },
  { key: 'react', label: 'React', render: () => <DeviconImg src={reactIcon} /> },
  { key: 'tailwind', label: 'Tailwind CSS', render: () => <DeviconImg src={tailwindIcon} /> },
  { key: 'cursor', label: 'Cursor', render: () => <SimpleBrandIcon icon={siCursor} monochrome /> },
  { key: 'html5', label: 'HTML5', render: () => <DeviconImg src={html5Icon} /> },
  { key: 'css3', label: 'CSS3', render: () => <DeviconImg src={css3Icon} /> },
  { key: 'claude', label: 'Claude', render: () => <SimpleBrandIcon icon={siClaude} /> },
  { key: 'webflow', label: 'Webflow', render: () => <SimpleBrandIcon icon={siWebflow} /> },
  { key: 'elevenlabs', label: 'ElevenLabs', render: () => <SimpleBrandIcon icon={siElevenlabs} monochrome /> },
  { key: 'asana', label: 'Asana', render: () => <SimpleBrandIcon icon={siAsana} /> },
  { key: 'amplitude', label: 'Amplitude', render: () => <AmplitudeLogo /> },
  { key: 'posthog', label: 'PostHog', render: () => <PostHogLogo /> },
  { key: 'lovable', label: 'Lovable', render: () => <RasterLogo src={lovableLogo} /> },
  { key: 'screenstudio', label: 'Screen Studio', render: () => <RasterLogo src={screenStudioLogo} /> },
  { key: 'adobe', label: 'Adobe', render: () => <RasterLogo src={adobeLogo} /> },
]

function LogoTile({ label, children }) {
  return (
    <div className="logo-marquee-tile flex w-16 flex-none flex-col items-center gap-2.5">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)]">
        {children}
      </div>
      <span className="max-w-[4.5rem] text-center font-[family-name:var(--mono)] text-[10px] leading-tight tracking-[0.12em] text-[var(--muted)] uppercase">
        {label}
      </span>
    </div>
  )
}

function LogoMarquee() {
  const sequence = [0, 1, 2].flatMap((copy) =>
    LOGOS.map((logo) => (
      <LogoTile key={`${copy}-${logo.key}`} label={logo.label}>
        {logo.render()}
      </LogoTile>
    ))
  )

  return (
    <div
      className="logo-marquee relative w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(90deg, transparent 0, #000 4%, #000 96%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 4%, #000 96%, transparent 100%)',
      }}
      aria-label="Tools and platforms"
    >
      <div className="logo-marquee-track flex w-max items-start py-1">
        {sequence}
      </div>
    </div>
  )
}

export default LogoMarquee
