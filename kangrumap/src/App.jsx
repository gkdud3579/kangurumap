import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // 홈 페이지
import Result from "./pages/Result"; // 검색 결과 페이지
import Detail from "./pages/Detail"; // 상세 페이지
import NotFound from "./pages/NotFound"; // 404 에러 페이지
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* "/" 경로로 접속하면 자동으로 Home.jsx가 렌더링됨 */}
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
