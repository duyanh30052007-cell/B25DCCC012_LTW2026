import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;
  if (!result) return <Navigate to="/" replace />;
  const messages = {
    wrong: "Bạn đã bị loại",
    timeout: "Hết giờ!",
    completed: result.correctCount === 15 ? "Chúc mừng! Bạn đã rung chuông vàng" : "Bạn đã hoàn thành lượt chơi"
  };
  return (
    <section className="panel result-panel center">
      <div className="result-icon">{result.reason === "completed" && result.correctCount === 15 ? "🏆" : "📋"}</div>
      <p className="eyebrow">KẾT QUẢ LƯỢT CHƠI</p><h1>{messages[result.reason] || "Kết quả lượt chơi"}</h1>
      <div className="result-stats">
        <div><span>Người chơi</span><strong>{result.playerName}</strong></div>
        <div><span>Số câu trả lời đúng</span><strong>{result.correctCount}/15</strong></div>
        <div><span>Điểm</span><strong>{result.score}</strong></div>
        <div><span>Danh hiệu</span><strong>{result.rank}</strong></div>
      </div>
      <div className="result-actions">
        <button className="primary" onClick={() => navigate("/play")}>Chơi lại</button>
        <button className="secondary" onClick={() => navigate("/")}>Về trang chủ</button>
      </div>
    </section>
  );
}
