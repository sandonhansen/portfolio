import { useParams, Navigate } from 'react-router-dom'
import { CASE_STUDIES } from '../data/work'
import SiteFooter from '../components/SiteFooter'
import './case-study.css'

function CaseStudy() {
  const { slug } = useParams()
  const study = CASE_STUDIES.find((s) => s.slug === slug)

  if (!study) return <Navigate to="/work" replace />

  // Full narrative currently exists for the Quickly buyer platform case study.
  if (slug !== 'quickly-buyer-platform') {
    return (
      <div className="case">
        <div className="wrap">
          <header className="head">
            <div className="eyebrow">{study.eyebrow}</div>
            <h1>{study.title}</h1>
            <p className="lead" style={{ marginTop: 18 }}>{study.hook}</p>
          </header>
          <SiteFooter />
        </div>
      </div>
    )
  }

  return (
    <div className="case">
      <div className="wrap">
        <header className="head">
          <div className="eyebrow"><b>Case study 01</b> · Quickly buyer platform</div>
          <h1>Helping buyers find and action invoices in seconds</h1>
          <div className="metarow">
            <div className="m"><div className="k">Role</div><div className="v">Founding Product Designer</div></div>
            <div className="m"><div className="k">Scope</div><div className="v">Research to UI to shipped</div></div>
            <div className="m"><div className="k">Platform</div><div className="v">B2B fintech, web</div></div>
            <div className="m"><div className="k">Team</div><div className="v">Design of one</div></div>
          </div>
        </header>

        <section style={{ marginTop: 'clamp(32px,5vw,56px)' }}>
          <div className="fig wide f-char"><span className="tag">Placeholder · your screen</span><span className="cap">List view — final design</span></div>
          <div className="figc">Placeholder for the redesigned list view. Swap in a real screen or short screen-capture.</div>
        </section>

        <section>
          <div className="split">
            <div>
              <div className="eyebrow">Overview</div>
              <p className="lead">Quickly is a B2B early-payment platform that connects buyers and suppliers. Buyers spend most of their time in one place: a list of invoices they need to find, understand, and act on.</p>
              <p className="body">When that list is slow to scan or ambiguous to read, everything downstream slows with it. I led a ground-up redesign of the invoice list view and the invoice modal so a buyer can locate exactly what they're looking for and take the right action without hesitation. The result is a surface customers consistently describe as simple and easy to use, in a category where that's rare.</p>
            </div>
            <div className="facts">
              <div className="row"><span className="k">My contribution</span><span className="v">Research, UX, UI, copy, build spec</span></div>
              <div className="row"><span className="k">Surface</span><span className="v">List view + invoice modal</span></div>
              <div className="row"><span className="k">Users</span><span className="v">Buyers</span></div>
              <div className="row"><span className="k">Status</span><span className="v">Shipped to production</span></div>
            </div>
          </div>
        </section>

        <section>
          <div className="eyebrow">Anticipating the problem</div>
          <h2 className="h2">Nobody had this project on the radar. I did.</h2>
          <p className="body">This redesign wasn't handed to me. I watched how buyers actually moved through the platform and saw several separate problems quietly converging on one surface — the invoice list. Before any of them surfaced as a metric or a support ticket, I made the case that one focused change would solve them together: rework the view, show only the data that's contextual to the decision, and make the tabs genuinely mean something.</p>
          <p className="body">There's a fair question underneath this: why hadn't the list been built properly already? Most fintech platforms start with a dense list — Quickly deliberately didn't. Early on, a scannable card view fit our suppliers well and earned its keep. But as the user base evolved toward buyers, the card view stopped matching how they worked, and the list view hadn't kept pace. Reading that shift early is what started this project.</p>
          <div className="solved">
            <div className="s"><div className="q">&ldquo;What status is this bill?&rdquo;</div><div className="a">The redesign let buyers follow the full invoice and request lifecycle at a glance, so status stopped being a question.</div></div>
            <div className="s"><div className="q">&ldquo;How does Quickly even work?&rdquo;</div><div className="a">Intentional tabs and contextual-only data made the business model legible to users still learning the platform.</div></div>
            <div className="s"><div className="q">&ldquo;Where's the thing I need?&rdquo;</div><div className="a">Buyers stopped scanning chaotically and could narrow straight to what they were looking for.</div></div>
          </div>
          <p className="body muted">One change, several problems solved — before any of them became a fire.</p>
          <div className="fig f-bone" style={{ marginTop: '34px' }}><span className="tag">Placeholder · your screen</span><span className="cap">Before — the original list</span></div>
        </section>

        <section>
          <div className="eyebrow">Approach &amp; research</div>
          <h2 className="h2">Grounded in interface research, not preference</h2>
          <p className="body">I broke the redesign into a tracked set of decisions rather than one big rework, so each change was legible and shippable on its own. Three lenses drove the work.</p>
          <div className="cards3">
            <div className="card"><div className="n">01</div><h3>Hick's Law</h3><p>Cut the competing choices and views on screen. Every extra option is decision time a buyer doesn't want to spend.</p></div>
            <div className="card"><div className="n">02</div><h3>Baymard patterns</h3><p>Established list and table usability research informed column logic, scannability, and hierarchy.</p></div>
            <div className="card"><div className="n">03</div><h3>Behavioral data</h3><p>How buyers actually used the existing views told me where attention went and what was being ignored.</p></div>
          </div>
        </section>

        <section>
          <div className="eyebrow">Key design decisions</div>
          <h2 className="h2">Every choice traced back to the buyer's decision</h2>
          <div className="decision">
            <div className="dnum">Decision 01</div>
            <div className="h3">Columns driven by the decision, not the data</div>
            <p className="body">I chose columns based on what a buyer needs to see to act, and cut or de-emphasized the rest, so the list surfaces the decision instead of the database.</p>
            <div className="fig f-green" style={{ marginTop: '24px' }}><span className="tag">Placeholder · your screen</span><span className="cap">Column logic</span></div>
          </div>
          <div className="decision">
            <div className="dnum">Decision 02</div>
            <div className="h3">Status made glanceable</div>
            <p className="body">The early-payment progress tracker and expected-payment states were designed so a buyer reads status in one pass, without opening anything.</p>
          </div>
          <div className="decision">
            <div className="dnum">Decision 03</div>
            <div className="h3">Currency you can scan</div>
            <p className="body">Amounts align cleanly with superscript decimals, so a column of numbers reads as a column, not a ragged list. Small, but it's the kind of detail that makes a financial product feel trustworthy.</p>
          </div>
          <div className="decision">
            <div className="dnum">Decision 04</div>
            <div className="h3">An invoice modal built around actioning</div>
            <p className="body">When a buyer opens an invoice, the modal is structured so the next action is obvious — not just a place to view details, but a place to move forward.</p>
            <div className="fig f-char" style={{ marginTop: '24px' }}><span className="tag">Placeholder · your screen</span><span className="cap">Invoice modal</span></div>
          </div>
        </section>

        <section>
          <div className="callout">
            <div className="eyebrow"><b>The hard part</b> · Driving the call</div>
            <div className="big">The hardest part wasn't the pixels. It was removing card view entirely and committing the product to one optimized list.</div>
            <p className="body">That was a call above my title, so I made the case rather than assuming it. I built a pitch for the CEO backed by behavioral data, the Hick's Law and Baymard research, and a formal feature ticket, and argued that one great list beats two mediocre views.</p>
            <p className="body muted">This is the part I'm proudest of. It shows the job I actually do: not just designing the screen, but owning the product decision and building the internal case to change the company's direction.</p>
          </div>
        </section>

        <section>
          <div className="eyebrow">Impact</div>
          <div className="quote" style={{ marginTop: '14px' }}>Customers consistently describe the platform as <span className="lime">simple and easy to use</span> — the hardest compliment to earn in B2B fintech.</div>
          <div className="metrics">
            <div className="metric"><div className="val">—</div><div className="lab">Your headline metric</div></div>
            <div className="metric"><div className="val">—</div><div className="lab">Your second metric</div></div>
            <div className="metric"><div className="val">—</div><div className="lab">Your third metric</div></div>
          </div>
          <div className="slotnote">Metric slots — drop in real numbers (time-to-action, support-ticket reduction, adoption), or a customer quote.</div>
        </section>

        <section>
          <div className="eyebrow">What I took from it</div>
          <h2 className="h2">Spot the problem early, ground it in evidence, and drive the call</h2>
          <p className="body">This project is a compact version of how I work: notice problems before anyone names them by watching how people actually work, then ground decisions in research and behavior instead of taste, break a large redesign into legible shippable pieces, and when the right call sits above my title, build the case and drive it rather than wait for permission.</p>
          <p className="body">The list view is where Quickly's buyers live. Making it effortless is design work that shows up directly in the business.</p>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}

export default CaseStudy
