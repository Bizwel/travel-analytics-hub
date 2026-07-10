export default function OperationsPage() {
  return (
    <div className="page-shell">
      <section className="hero-panel card border-0 shadow-sm">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <p className="eyebrow mb-2">Operations</p>
            <h2 className="display-6 fw-semibold mb-3">Operational readiness is staying ahead of disruption.</h2>
            <p className="hero-copy mb-0">
              Teams can see capacity, turnaround status, and exception handling in one place without switching tools.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="hero-highlight">
              <p className="eyebrow mb-2">Turnaround efficiency</p>
              <h3 className="mb-2">+8.4%</h3>
              <p className="small-text mb-0">Average turn time improved this month.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4 mt-1">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="eyebrow mb-2">Service network</p>
              <h5 className="mb-3">Gate and crew coordination</h5>
              <div className="d-grid gap-3">
                <div className="insight-item">
                  <div className="fw-semibold">Hub balancing</div>
                  <div className="small-text">Support teams are fluidly cross-allocated to protect peak departures.</div>
                </div>
                <div className="insight-item">
                  <div className="fw-semibold">Vendor SLA</div>
                  <div className="small-text">Ground services are tracking within 3% of expected performance.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="eyebrow mb-2">Control center</p>
              <h5 className="mb-3">Exception management</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">Priority re-accommodation: 6 requests</li>
                <li className="list-group-item px-0">Regional staffing coverage: 97%</li>
                <li className="list-group-item px-0">Interline coordination: stable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
