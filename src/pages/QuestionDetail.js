import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LEVELS, POINTS, LETTERS } from "../data";

export default function QuestionDetail({ questions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions.find((item) => item.id === Number(id));
  if (!question) return <section className="panel"><h2>Không tìm thấy câu hỏi</h2><button onClick={() => navigate(-1)}>Quay lại</button></section>;
  return (
    <section className="panel detail-panel">
      <button className="back-button" onClick={() => navigate(-1)}>← Quay lại</button>
      <p className="eyebrow">CHI TIẾT CÂU HỎI</p>
      <h1>Câu hỏi số {question.id} – {question.topic}</h1>
      <p className="muted">Mức độ: {LEVELS[question.level]} · {POINTS[question.level]} điểm</p>
      <h2 className="question-text">{question.question}</h2>
      <div className="detail-options">{question.options.map((option, index) =>
        <div key={index} className={`detail-option ${index === question.answer ? "correct-option" : ""}`}>
          <b>{LETTERS[index]}.</b> {option}
          {index === question.answer && <strong> ✓ Đáp án đúng</strong>}
        </div>
      )}</div>
    </section>
  );
}
