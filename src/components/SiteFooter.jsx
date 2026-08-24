import { ArrowUpRight } from '@phosphor-icons/react'

function SiteFooter() {
  return (
    <div className="site-footer">
      <div className="endcta">
        <div className="big">Let's build something.</div>
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
