import { useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { SandonIconRound } from './SandonIconRound'

function SiteFooter() {
  const [ctaHot, setCtaHot] = useState(false)

  return (
    <div
      className="site-footer"
      onPointerEnter={() => setCtaHot(true)}
      onPointerLeave={() => setCtaHot(false)}
    >
      <div className="endcta">
        <div className="big">
          <SandonIconRound size={64} active={ctaHot} />
          <span>Let's build something.</span>
        </div>
        <a className="cta" href="mailto:sandonhansen@gmail.com">
          Connect
          <ArrowUpRight className="arr" size={16} weight="bold" aria-hidden="true" />
        </a>
      </div>
      <div className="site-foot">
        <span>Calgary, AB · Mountain Time</span>
        <span className="status"><span className="d"></span>Currently open to work</span>
      </div>
    </div>
  )
}

export default SiteFooter
