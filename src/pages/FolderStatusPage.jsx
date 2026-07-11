import { useState } from 'react'
import MetricCard from '../components/MetricCard'
import { analyzeFolderStatusFile } from '../services/folderStatusService'


const summaryCards = [
  {
    title: 'Total Records',
    icon: 'journal-bookmark',
    accent: 'accent-blue',
  },
  {
    title: 'Invoiced',
    icon: 'cash-coin',
    accent: 'accent-teal',
  },
  {
    title: 'Uninvoiced',
    icon: 'receipt',
    accent: 'accent-violet',
  },
]

export default function FolderStatusPage() {
  import { useData } from "../context/DataContext";
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const { workbook, setWorkbook } = useData()
  const analysis = workbook;

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setIsProcessing(true)
    setError('')
    setFileName(file.name)
    const {

          analysis,
          setAnalysis,
          
          fileName,
          setFileName,
          
          rows,
          setRows
          
          } = useData();
   try {
  const result = await analyzeFolderStatusFile(file)

  setWorkbook(result)

} catch (err) {
  }

  const cards = analysis
    ? [
        {
          ...summaryCards[0],
          value: analysis.totalRecords,
          change: 'records scanned',
          detail: `Source: ${analysis.sheetName}`,
        },
        {
          ...summaryCards[1],
          value: analysis.invoiced,
          change: `${Math.round((analysis.invoiced / Math.max(analysis.totalRecords, 1)) * 100)}%`,
          detail: 'mapped to invoiced',
        },
        {
          ...summaryCards[2],
          value: analysis.uninvoiced,
          change: `${Math.round((analysis.uninvoiced / Math.max(analysis.totalRecords, 1)) * 100)}%`,
          detail: 'mapped to uninvoiced',
        },
      ]
    : summaryCards.map((card) => ({ ...card, value: '—', change: 'upload workbook', detail: 'No analysis available yet' }))

  return (
    <div className="page-shell">
      <section className="hero-panel card border-0 shadow-sm">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <p className="eyebrow mb-2">Folder status analytics</p>
            <h2 className="display-6 fw-semibold mb-3">Transform Excel folder status data into a clear operational summary.</h2>
            <p className="hero-copy mb-0">
              Upload a workbook, let the app detect the Folder Status column automatically, and classify each record into Invoiced or Uninvoiced.
            </p>
          </div>
          <div className="col-lg-4">
            <div className="hero-highlight">
              <p className="eyebrow mb-2">Upload workbook</p>
              <label className="btn btn-primary w-100" htmlFor="folder-status-upload">
                <i className="bi bi-cloud-arrow-up me-2" />
                Choose Excel file
              </label>
              <input
                id="folder-status-upload"
                className="d-none"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                onClick={(event) => {
                  event.currentTarget.value = ''
                }}
              />
              <p className="small-text mt-3 mb-0">Accepted formats: .xlsx, .xls, .csv</p>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4 mt-1">
        {cards.map((card) => (
          <div key={card.title} className="col-12 col-md-6 col-xl-4">
            <MetricCard {...card} />
          </div>
        ))}
      </section>

      <section className="row g-4 mt-1">
        <div className="col-12 col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="eyebrow mb-2">Analysis details</p>
              <h5 className="mb-3">Workbook insights</h5>
              {isProcessing ? (
                <div className="d-flex align-items-center gap-2 text-muted">
                  <div className="spinner-border spinner-border-sm" role="status" aria-label="Processing workbook" />
                  <span>Analyzing workbook…</span>
                </div>
              ) : analysis ? (
                <div className="d-grid gap-3">
                  <div className="insight-item">
                    <div className="fw-semibold">File</div>
                    <div className="small-text">{fileName}</div>
                  </div>
                  <div className="insight-item">
                    <div className="fw-semibold">Detected folder status column</div>
                    <div className="small-text">{analysis.detectedColumn}</div>
                  </div>
                  <div className="insight-item">
                    <div className="fw-semibold">Worksheet</div>
                    <div className="small-text">{analysis.sheetName}</div>
                  </div>
                  {analysis.blankStatusRows > 0 ? (
                    <div className="insight-item">
                      <div className="fw-semibold">Blank/missing statuses</div>
                      <div className="small-text">{analysis.blankStatusRows} row(s) skipped</div>
                    </div>
                  ) : null}
                  {Object.keys(analysis.rawStatusCounts).length ? (
                    <div className="insight-item">
                      <div className="fw-semibold">Folder Status breakdown</div>
                      <div className="small-text">
                        {Object.entries(analysis.rawStatusCounts)
                          .slice(0, 10)
                          .map(([status, count]) => (
                            <div key={status}>
                              {status}: {count}
                            </div>
                          ))}
                        {Object.keys(analysis.rawStatusCounts).length > 10 ? (
                          <div>+{Object.keys(analysis.rawStatusCounts).length - 10} more values</div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  {analysis.unrecognizedStatusRows > 0 ? (
                    <div className="insight-item">
                      <div className="fw-semibold">Unrecognized Folder Status values</div>
                      <div className="small-text">{analysis.unrecognizedStatusRows} row(s) ignored</div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="hero-copy mb-0">
                  Upload a workbook to see the detected status column and the resulting counts for each category.
                </p>
              )}
              {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="eyebrow mb-2">Business rules applied</p>
              <h5 className="mb-3">How statuses are classified</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  <span className="fw-semibold">Invoiced</span>
                  <div className="small-text">Invoiced, Partial Refund</div>
                </li>
                <li className="list-group-item px-0">
                  <span className="fw-semibold">Uninvoiced</span>
                  <div className="small-text">Refund Request, Saved</div>
                </li>
                <li className="list-group-item px-0">
                  <span className="fw-semibold">Other Folder Status values</span>
                  <div className="small-text">Any values not matching the four target statuses are ignored.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
