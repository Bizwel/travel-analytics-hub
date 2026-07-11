import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import OverviewPage from "./pages/OverviewPage";
import ForecastPage from "./pages/ForecastPage";
import OperationsPage from "./pages/OperationsPage";
import ReportsPage from "./pages/ReportsPage";
import FolderStatusPage from "./pages/FolderStatusPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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
  );
}
