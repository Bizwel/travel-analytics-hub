export default function MetricCard({ title, value, change, detail, icon, accent }) {
  return (
    <div className="card metric-card h-100 border-0 shadow-sm">
      <div className="card-body">
        <div className={`metric-icon ${accent}`}>
          <i className={`bi bi-${icon}`} />
        </div>
        <div className="mt-3">
          <p className="eyebrow mb-1">{title}</p>
          <h3 className="mb-1">{value}</h3>
          <div className="d-flex align-items-center gap-2 text-muted">
            <span className="trend-pill">{change}</span>
            <span>{detail}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
