import { BrowserRouter, Routes, Route } from "react-router-dom";

function TestPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Router Works</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
