import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import FolderStatusPage from './pages/FolderStatusPage'
import ForecastPage from './pages/ForecastPage'
import OperationsPage from './pages/OperationsPage'
import OverviewPage from './pages/OverviewPage'
import ReportsPage from './pages/ReportsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/folder-status" element={<FolderStatusPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
