import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ playerName, setPlayerName, history }) {
  const navigate = useNavigate();
  const best = [...history].sort((a, b) => b.score - a.score)[0];
  function startGame(event) {
    event.preventDefault();
    if (playerName.trim()) navigate("/play");
  }
  return (
    <section className="hero panel">
      <div className="hero-icon">🔔</div>
      <p className="eyebrow">THỬ THÁCH KIẾN THỨC</p>
      <h1>Rung chuông vàng</h1>
      <p className="lead">15 câu hỏi · 20 giây mỗi câu · tối đa 300 điểm</p>
      <div className="rules">
        <h3>Luật chơi</h3>
        <ul>
          <li>Trả lời đúng nhận 10, 20 hoặc 30 điểm theo độ khó.</li>
          <li>Trả lời sai hoặc hết giờ sẽ bị loại, trừ khi dùng phao cứu sinh.</li>
          <li>Bạn có 3 quyền trợ giúp, mỗi quyền dùng một lần.</li>
        </ul>
      </div>
      {best && <p className="record">🏆 Kỷ lục: <b>{best.score} điểm – {best.name}</b></p>}
      <form className="start-form" onSubmit={startGame}>
        <label htmlFor="playerName">Tên người chơi</label>
        <input id="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Nhập tên của bạn..." />
        <button className="primary" type="submit" disabled={!playerName.trim()}>Vào thi</button>
      </form>
    </section>
  );
}
