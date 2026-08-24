import { siAsana, siClaude, siCursor, siElevenlabs, siWebflow } from 'simple-icons'
import figmaIcon from 'devicon/icons/figma/figma-original.svg?url'
import reactIcon from 'devicon/icons/react/react-original.svg?url'
import tailwindIcon from 'devicon/icons/tailwindcss/tailwindcss-original.svg?url'
import html5Icon from 'devicon/icons/html5/html5-original.svg?url'
import css3Icon from 'devicon/icons/css3/css3-original.svg?url'
import lovableLogo from '../assets/logo-lovable.svg'
import screenStudioLogo from '../assets/logo-screenstudio.png'
import adobeLogo from '../assets/logo-adobe.svg'

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
