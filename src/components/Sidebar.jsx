import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Overview', icon: 'grid-1x2-fill' },
  { to: '/forecast', label: 'Demand Forecast', icon: 'bar-chart-fill' },
  { to: '/operations', label: 'Operations', icon: 'speedometer2' },
  { to: '/reports', label: 'Executive Reports', icon: 'journal-richtext' },
  { to: '/folder-status', label: 'Folder Status', icon: 'folder2-open' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-icon">
          <i className="bi bi-sliders" />
        </div>
        <div>
          <p className="eyebrow mb-0">Workspace</p>
          <h6 className="mb-0">Travel Intelligence</h6>
        </div>
      </div>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <i className={`bi bi-${item.icon}`} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-card">
        <p className="eyebrow mb-2">Live status</p>
        <h6 className="mb-2">System health 99.2%</h6>
        <div className="progress" role="progressbar" aria-label="system health">
          <div className="progress-bar" style={{ width: '99.2%' }} />
        </div>
        <p className="small-text mt-3 mb-0">All core dashboards synced 1 min ago.</p>
      </div>
    </aside>
  )
}
