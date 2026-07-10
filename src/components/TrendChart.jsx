export default function TrendChart({ values }) {
  const max = Math.max(...values)
  const points = values
    .map((value, index) => {
      const x = 12 + index * 58
      const y = 120 - (value / max) * 90
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="card chart-card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="eyebrow mb-1">Weekly demand</p>
            <h5 className="mb-0">Demand trend across key corridors</h5>
          </div>
          <span className="trend-pill">+11.8% this week</span>
        </div>
        <svg viewBox="0 0 420 140" className="trend-svg" role="img" aria-label="Demand trend chart">
          <path d={`M 12 120 L ${points} L 360 120 Z`} className="trend-area" />
          <polyline points={points} className="trend-line" />
          {values.map((value, index) => {
            const x = 12 + index * 58
            const y = 120 - (value / max) * 90
            return <circle key={`${value}-${index}`} cx={x} cy={y} r="4.5" className="trend-dot" />
          })}
        </svg>
        <div className="d-flex justify-content-between text-muted small-text mt-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  )
}
