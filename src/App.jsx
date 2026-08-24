import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar'
import Home from './pages/home'
import Work from './pages/work'
import CaseStudy from './pages/case-study'
import About from './pages/about'

function pageClass(pathname) {
  if (pathname.startsWith('/work')) return 'work'
  if (pathname.startsWith('/about')) return 'about'
  return ''
}

function Layout() {
  const { pathname } = useLocation()
  const page = pageClass(pathname)

  return (
    <main className={page ? `panel ${page}` : 'panel'}>
      <TopBar />
      <Outlet />
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/connect" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
