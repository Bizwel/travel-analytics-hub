import { useMemo, useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import "chart.js/auto";

import MetricCard from "../components/MetricCard";
import TrendChart from "../components/TrendChart";

import {
  alerts,
  routePerformance,
  trendSeries,
  getDashboardMetrics,
} from "../data/dashboardData";

import { useAnalytics } from "../context/DataContext";

const executiveRows = [
  { route: 'SEA → LAX', region: 'West Coast', demand: 'High', load: '92%', loadValue: 92, margin: '+12.4%', revenue: '$1.24M', revenueValue: 1.24, marginValue: 12.4 },
  { route: 'JFK → MIA', region: 'East Coast', demand: 'Peak', load: '88%', loadValue: 88, margin: '+9.8%', revenue: '$980K', revenueValue: 0.98, marginValue: 9.8 },
  { route: 'ORD → DEN', region: 'Midwest', demand: 'Steady', load: '81%', loadValue: 81, margin: '+6.2%', revenue: '$760K', revenueValue: 0.76, marginValue: 6.2 },
  { route: 'SFO → HNL', region: 'Pacific', demand: 'High', load: '95%', loadValue: 95, margin: '+14.1%', revenue: '$1.48M', revenueValue: 1.48, marginValue: 14.1 },
  { route: 'ATL → BOS', region: 'Northeast', demand: 'Rising', load: '84%', loadValue: 84, margin: '+7.6%', revenue: '$815K', revenueValue: 0.815, marginValue: 7.6 },
  { route: 'DFW → LAS', region: 'Southwest', demand: 'High', load: '90%', loadValue: 90, margin: '+11.2%', revenue: '$1.03M', revenueValue: 1.03, marginValue: 11.2 },
]

const demandMixData = {
  labels: ['Premium', 'Leisure', 'Corporate', 'Group'],
  datasets: [
    {
      data: [38, 32, 20, 10],
      backgroundColor: ['#2f6ed1', '#18b0a7', '#7c4dff', '#f59e0b'],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}

const channelMixData = {
  labels: ['Direct', 'OTA', 'Corporate', 'Agency'],
  datasets: [
    {
      data: [44, 28, 18, 10]
      backgroundColor: ['#2f6ed1', '#18b0a7', '#7c4dff', '#f59e0b'],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}

const barChartData = {
  labels: routePerformance.map((item) => item.route),
  datasets: [
    {
      label: 'Demand score',
      data: [92, 88, 81, 95],
      backgroundColor: ['#2f6ed1', '#18b0a7', '#7c4dff', '#f59e0b'],
      borderRadius: 10,
      maxBarThickness: 34,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 16,
      },
    },
  },
}

const barOptions = {
  ...chartOptions,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
}

export default function OverviewPage() {
  const { workbook } = useAnalytics();
  const metrics = getDashboardMetrics(workbook);
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'marginValue', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 4

  const filteredRows = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()
    
    return executiveRows.filter((row) => {
      if (!normalized) {
        return true
      }

      return [row.route, row.region, row.demand, row.load, row.margin, row.revenue].some((value) =>
        String(value).toLowerCase().includes(normalized),
      )
    })
  }, [searchTerm])

  const sortedRows = useMemo(() => {
    const rows = [...filteredRows]

    rows.sort((left, right) => {
      const leftValue = left[sortConfig.key]
      const rightValue = right[sortConfig.key]

      if (typeof leftValue === 'number' && typeof rightValue === 'number') {
        return sortConfig.direction === 'asc' ? leftValue - rightValue : rightValue - leftValue
      }

      const comparison = String(leftValue).localeCompare(String(rightValue))
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })

    return rows
  }, [filteredRows, sortConfig])

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / rowsPerPage))
  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return sortedRows.slice(start, start + rowsPerPage)
  }, [sortedRows, currentPage])

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        }
      }

      return { key, direction: 'asc' }
    })
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="page-shell">
      <section className="hero-panel card border-0 shadow-sm">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <p className="eyebrow mb-2">Executive snapshot</p>
            <h2 className="display-6 fw-semibold mb-3">Travel demand is accelerating across premium corridors.</h2>
            <p className="hero-copy mb-4">
              The hub is identifying profitable routes, balancing capacity, and surfacing the actions that matter most for your next operating window.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-primary">View live report</button>
              <button className="btn btn-outline-secondary">Export summary</button>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="hero-highlight">
              <p className="eyebrow mb-2">Next milestone</p>
              <h3 className="mb-3">14 routes above target</h3>
              <ul className="mb-0 ps-3">
                <li>Capacity aligned with premium booking peaks</li>
                <li>Airport handoff times improved by 6%</li>
                <li>Customer satisfaction trending upward</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4 mt-1">
        {metrics.map((metric) => (
          <div key={metric.title} className="col-12 col-md-6 col-xl-3">
            <MetricCard {...metric} />
          </div>
        ))}
      </section>

      <section className="row g-4 mt-1">
        <div className="col-12 col-xl-8">
          <TrendChart values={trendSeries} />
        </div>
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="eyebrow mb-2">Operational alerts</p>
              <h5 className="mb-3">What needs attention</h5>
              <ul className="list-group list-group-flush">
                {alerts.map((alert) => (
                  <li key={alert} className="list-group-item px-0">
                    <i className="bi bi-check-circle-fill text-success me-2" />
                    {alert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4 mt-1">
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100 chart-card">
            <div className="card-body">
              <p className="eyebrow mb-2">Demand mix</p>
              <h5 className="mb-3">Traveler segment distribution</h5>
              <div className="chart-shell">
                <Doughnut data={demandMixData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100 chart-card">
            <div className="card-body">
              <p className="eyebrow mb-2">Route performance</p>
              <h5 className="mb-3">Demand by corridor</h5>
              <div className="chart-shell">
                <Bar data={barChartData} options={barOptions} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100 chart-card">
            <div className="card-body">
              <p className="eyebrow mb-2">Channel mix</p>
              <h5 className="mb-3">Booking contribution by source</h5>
              <div className="chart-shell">
                <Pie data={channelMixData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4 mt-1">
        <div className="col-12">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-3">
                <div>
                  <p className="eyebrow mb-1">Professional data grid</p>
                  <h5 className="mb-0">Operational route performance</h5>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <div className="input-group input-group-sm table-search">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search routes or regions"
                      value={searchTerm}
                      onChange={(event) => {
                        setSearchTerm(event.target.value)
                        setCurrentPage(1)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>
                        <button className="btn btn-link p-0 text-decoration-none fw-semibold" onClick={() => handleSort('route')}>
                          Route
                        </button>
                      </th>
                      <th>
                        <button className="btn btn-link p-0 text-decoration-none fw-semibold" onClick={() => handleSort('region')}>
                          Region
                        </button>
                      </th>
                      <th>
                        <button className="btn btn-link p-0 text-decoration-none fw-semibold" onClick={() => handleSort('demand')}>
                          Demand
                        </button>
                      </th>
                      <th>
                        <button className="btn btn-link p-0 text-decoration-none fw-semibold" onClick={() => handleSort('loadValue')}>
                          Load
                        </button>
                      </th>
                      <th>
                        <button className="btn btn-link p-0 text-decoration-none fw-semibold" onClick={() => handleSort('marginValue')}>
                          Margin
                        </button>
                      </th>
                      <th>
                        <button className="btn btn-link p-0 text-decoration-none fw-semibold" onClick={() => handleSort('revenueValue')}>
                          Revenue
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((item) => (
                      <tr key={item.route}>
                        <td className="fw-semibold">{item.route}</td>
                        <td>{item.region}</td>
                        <td>{item.demand}</td>
                        <td>{item.load}</td>
                        <td className="text-success">{item.margin}</td>
                        <td>{item.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mt-3">
                <div className="small-text">
                  Showing {pageRows.length} of {sortedRows.length} records
                </div>
                <nav aria-label="Route performance pagination">
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(Math.max(1, currentPage - 1))}>
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
