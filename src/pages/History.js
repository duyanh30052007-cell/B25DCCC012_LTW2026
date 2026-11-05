import React from "react";

export default function History({ history, clearHistory }) {
  const sorted = [...history].sort((a, b) => b.score - a.score);
  const best = sorted[0];
  const average = history.length ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length) : 0;
  return (
    <section className="panel">
      <div className="section-heading"><div><p className="eyebrow">THỐNG KÊ</p><h1>Lịch sử lượt chơi</h1></div>
        <button className="danger-outline" onClick={clearHistory} disabled={!history.length}>Xóa lịch sử</button>
      </div>
      <div className="summary-grid">
        <div><span>Số lượt chơi</span><strong>{history.length}</strong></div>
        <div><span>Điểm cao nhất</span><strong>{best ? best.score : "—"}</strong></div>
        <div><span>Điểm trung bình</span><strong>{history.length ? average : "—"}</strong></div>
      </div>
      {history.length === 0 ? <p className="empty-state">Chưa có lượt chơi nào.</p> :
        <div className="table-wrap"><table><thead><tr><th>Người chơi</th><th>Số câu đúng</th><th>Điểm</th><th>Danh hiệu</th><th>Thời gian</th></tr></thead>
          <tbody>{sorted.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.correctCount}</td><td><b>{item.score}</b></td><td>{item.rank}</td><td>{item.playedAt}</td></tr>)}</tbody>
        </table></div>}
    </section>
  );
}
