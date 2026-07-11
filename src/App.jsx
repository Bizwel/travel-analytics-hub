import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import DashboardLayout from "./components/DashboardLayout";


export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<DashboardLayout />}>
         <Route path="/" element={<OverviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
