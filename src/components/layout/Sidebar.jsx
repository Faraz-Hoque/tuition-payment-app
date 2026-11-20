import { NavLink } from 'react-router'
import { APP_NAME } from '@/config/app'

export default function Sidebar({ pages, basePath, sectionLabel, onNavigate }) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar__brand">{APP_NAME}</div>
      <p className="sidebar__section">{sectionLabel}</p>
      <nav>
        <ul className="sidebar__list">
          {pages.map(({ path, label, icon: Icon }) => (
            <li key={path || 'index'}>
              <NavLink
                to={path ? `${basePath}/${path}` : basePath}
                // `end` makes the index link active only on exactly /student, not on /student/payments
                end={!path}
                className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}
                onClick={onNavigate}
              >
                <Icon className="sidebar__icon" aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
