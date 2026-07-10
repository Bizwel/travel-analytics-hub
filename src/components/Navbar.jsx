import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { to: '/', label: 'Overview', icon: 'speedometer2' },
  { to: '/forecast', label: 'Forecast', icon: 'graph-up' },
  { to: '/operations', label: 'Operations', icon: 'diagram-3' },
  { to: '/reports', label: 'Reports', icon: 'file-earmark-bar-graph' },
  { to: '/folder-status', label: 'Folder Status', icon: 'folder2-open' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="topbar navbar navbar-expand-lg">
      <div className="container-fluid px-0">
        <div className="d-flex align-items-center gap-3">
          <div className="brand-mark">
            <i className="bi bi-globe2" />
          </div>
          <div>
            <p className="eyebrow mb-0">Enterprise command center</p>
            <h5 className="mb-0">Travel Analytics Hub</h5>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2 ms-auto">
          <div className="topbar-search d-none d-md-flex">
            <i className="bi bi-search" />
            <input type="text" placeholder="Search routes, markets, KPIs" />
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-pill d-none d-lg-flex ${isActive ? 'active' : ''}`
              }
            >
              <i className={`bi bi-${link.icon}`} />
              {link.label}
            </NavLink>
          ))}
          <button type="button" className="theme-toggle" onClick={toggleTheme}>
            <i className={`bi bi-${theme === 'light' ? 'moon-stars' : 'sun'}`} />
          </button>
          <div className="user-chip">
            <div className="avatar">JD</div>
            <div className="d-none d-sm-block">
              <div className="fw-semibold">Jordan Doe</div>
              <div className="tiny-text">VP Operations</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
