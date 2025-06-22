import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkPage from "./Pages/WorkPage";
import SearchPage from "./Pages/SearchPage";
import ComicReaderWrapper from "./Pages/ComicReaderWrapper";
import LoginRegisterForm from "./Components/LoginRegisterForm/LoginRegisterForm"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/:workId" element={<WorkPage />} />
        {/* Добавляй другие страницы по мере необходимости */}
        <Route path="*" element={<p style={{ padding: "40px" }}>Страница не найдена</p>} />
        <Route path="/reader/:workId/:releaseId" element={<ComicReaderWrapper />} />
        <Route path="/auth" element={<LoginRegisterForm />} />
      </Routes>
    </Router>
  );
}
