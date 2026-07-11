import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

function TestPage() {
  return <h1>Dashboard OK</h1>;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<TestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
