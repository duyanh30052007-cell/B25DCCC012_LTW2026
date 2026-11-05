import React from "react";

export default function ScoreBoard({ answers, currentIndex, score }) {
  return (
    <section className="score-panel">
      <div className="score-line"><span>Điểm hiện tại</span><strong>{score}</strong></div>
      <div className="score-grid">
        {Array.from({ length: 15 }, (_, index) => {
          const answer = answers[index];
          return <div key={index} className={`score-cell ${answer?.correct ? "score-correct" : ""} ${answer?.lifeline ? "score-lifeline" : ""} ${index === currentIndex ? "score-current" : ""}`}>{index + 1}</div>;
        })}
      </div>
      <div className="legend"><span>🟩 Đúng</span><span>🟧 Dùng phao</span><span>⬜ Chưa trả lời</span></div>
    </section>
  );
}
