import { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

// The frame around every logged-in page: sidebar on the left, top bar, and the
// current page in <Outlet /> (React Router fills it with the matching child route).
//
// `pages` comes from app/navigation.js, so the sidebar always matches the routes.
export default function AppShell({ pages, basePath, sectionLabel }) {
  // On phones the sidebar is a slide-in drawer; this tracks whether it is open.
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className={`shell ${navOpen ? 'shell--nav-open' : ''}`}>
      <Sidebar
        pages={pages}
        basePath={basePath}
        sectionLabel={sectionLabel}
        onNavigate={() => setNavOpen(false)}
      />
      {/* Dark overlay behind the mobile drawer; tapping it closes the drawer. */}
      <div className="shell__overlay" onClick={() => setNavOpen(false)} aria-hidden="true" />

      <div className="shell__main">
        <Topbar onMenuClick={() => setNavOpen(true)} />
        <main className="shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
