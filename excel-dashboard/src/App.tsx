import "./App.css";

import Upload from "./pages/Upload/Upload";
import History from "./pages/History/History";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard/Dashboard";
import MainLayout from "./layouts/MainLayout";
import { ExcelProvider } from "./context/ExcelContex";
import ColumnDetail from "./pages/ColumnDetail/ColumnDetail";

function App() {
  return (
    <ExcelProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/history" element={<History />} />
            <Route path="/column/:columnName" element={<ColumnDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ExcelProvider>
  );
}

export default App;
