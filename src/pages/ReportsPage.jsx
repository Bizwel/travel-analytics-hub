import { useRef } from 'react'
import { exportToCsv, exportToExcel, exportToPdf, printReport } from '../utils/exportUtils'

const reportRows = [
  { metric: 'Revenue uplift', value: '$4.8M', status: 'On track' },
  { metric: 'Occupancy', value: '86.4%', status: 'Stable' },
  { metric: 'On-time arrivals', value: '94.1%', status: 'Improving' },
  { metric: 'Traveler sentiment', value: '4.8/5', status: 'Excellent' },
]

export default function ReportsPage() {
  const reportRef = useRef(null)

  const handleExport = async (type) => {
    if (type === 'csv') {
      exportToCsv(reportRows, 'travel-report.csv')
      return
    }

    if (type === 'excel') {
      exportToExcel(reportRows, 'travel-report.xlsx')
      return
    }

    if (type === 'pdf') {
      await exportToPdf(reportRef.current, 'travel-report.pdf')
      return
    }

    if (type === 'print') {
      printReport(reportRef.current)
    }
  }

  return (
    <div className="page-shell">
      <section className="hero-panel card border-0 shadow-sm">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <p className="eyebrow mb-2">Executive reports</p>
            <h2 className="display-6 fw-semibold mb-3">Board-ready reporting without the manual assembly.</h2>
            <p className="hero-copy mb-0">
              Summaries, snapshots, and variance commentary are packaged for leadership, finance, and commercial teams in one experience.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="hero-highlight">
              <p className="eyebrow mb-2">This week</p>
              <h3 className="mb-2">28 reports shared</h3>
              <p className="small-text mb-0">Across operations, product, and strategy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4 mt-1">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-3">
                <div>
                  <p className="eyebrow mb-1">Report export module</p>
                  <h5 className="mb-0">Export the current report in your preferred format</h5>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleExport('csv')}>Export CSV</button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleExport('excel')}>Export Excel</button>
                  <button className="btn btn-primary btn-sm" onClick={() => handleExport('pdf')}>Export PDF</button>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleExport('print')}>Print</button>
                </div>
              </div>

              <div ref={reportRef} className="border rounded-4 p-4 bg-white">
                <div className="row g-4 align-items-center mb-4">
                  <div className="col-lg-8">
                    <p className="eyebrow mb-2">Leadership brief</p>
                    <h4 className="mb-2">Quarterly outlook</h4>
                    <p className="small-text mb-0">
                      Revenue concentration remains healthy, with premium lanes outperforming the broader network by 12%.
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <div className="hero-highlight">
                      <p className="eyebrow mb-2">This week</p>
                      <h3 className="mb-2">28 reports shared</h3>
                      <p className="small-text mb-0">Across operations, product, and strategy.</p>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Value</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportRows.map((row) => (
                        <tr key={row.metric}>
                          <td>{row.metric}</td>
                          <td>{row.value}</td>
                          <td>{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
