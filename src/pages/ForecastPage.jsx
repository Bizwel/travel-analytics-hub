import { forecastMarkets } from '../data/dashboardData'

export default function ForecastPage() {
  return (
    <div className="page-shell">
      <section className="hero-panel card border-0 shadow-sm">
        <div className="row align-items-center g-4">
          <div className="col-lg-8">
            <p className="eyebrow mb-2">Forecasting</p>
            <h2 className="display-6 fw-semibold mb-3">Demand signals are strongest in high-value leisure and corporate clusters.</h2>
            <p className="hero-copy mb-0">
              Blend historical booking patterns, route economics, and seasonal behavior to anticipate pressure points before they surface.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="hero-highlight">
              <p className="eyebrow mb-2">Forecast confidence</p>
              <h3 className="mb-2">92%</h3>
              <p className="small-text mb-0">Model accuracy across H1 planning horizons.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4 mt-1">
        <div className="col-12 col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="eyebrow mb-2">Route demand forecast</p>
              <h5 className="mb-3">Expected demand increase over the next 90 days</h5>
              <div className="forecast-grid">
                {[78, 84, 92, 67, 81].map((value, index) => (
                  <div key={value} className="forecast-item">
                    <div className="forecast-bar" style={{ height: `${value}%` }} />
                    <span>W{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="eyebrow mb-2">Priority markets</p>
              <h5 className="mb-3">Markets with the strongest near-term potential</h5>
              <div className="d-grid gap-3">
                {forecastMarkets.map((market) => (
                  <div key={market.market} className="insight-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">{market.market}</span>
                      <span className="trend-pill">{market.demand}</span>
                    </div>
                    <div className="small-text">{market.growth}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
