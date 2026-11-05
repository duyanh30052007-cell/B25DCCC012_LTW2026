import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LEVELS, TOPICS } from "../data";

export default function QuestionBank({ questions, loading, error }) {
  const [topic, setTopic] = useState("Tất cả");
  const [term, setTerm] = useState("");
  // Tên hàm tìm kiếm được yêu cầu trong đề.
  const handleTermShift = (value) => setTerm(value);
  const filtered = useMemo(() => questions.filter((q) =>
    (topic === "Tất cả" || q.topic === topic) &&
    q.question.toLocaleLowerCase("vi").includes(term.toLocaleLowerCase("vi"))
  ), [questions, topic, term]);

  if (loading) return <p className="notice">Đang tải câu hỏi...</p>;
  if (error) return <p className="notice error">Không tải được câu hỏi. Hãy thử tải lại trang.</p>;
  return (
    <section className="panel">
      <div className="section-heading">
        <div><p className="eyebrow">ÔN TẬP</p><h1>Ngân hàng câu hỏi</h1></div>
        <span className="count-badge">Có {filtered.length} câu hỏi</span>
      </div>
      <div className="filters">
        <label>Chủ đề<select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option>Tất cả</option>{TOPICS.map((item) => <option key={item}>{item}</option>)}
        </select></label>
        <label className="search-field">Tìm kiếm câu hỏi
          <input value={term} onChange={(e) => handleTermShift(e.target.value)} placeholder="Nhập nội dung cần tìm..." />
        </label>
      </div>
      <div className="table-wrap"><table>
        <thead><tr><th>STT</th><th>Chủ đề</th><th>Mức độ</th><th>Câu hỏi</th></tr></thead>
        <tbody>
          {filtered.map((q, index) => <tr key={q.id}><td>{index + 1}</td><td><span className="topic-tag">{q.topic}</span></td><td><span className={`level level-${q.level}`}>{LEVELS[q.level]}</span></td><td><Link to={`/questions/${q.id}`}>{q.question}</Link></td></tr>)}
          {filtered.length === 0 && <tr><td colSpan="4" className="empty">Không tìm thấy câu hỏi phù hợp.</td></tr>}
        </tbody>
      </table></div>
    </section>
  );
}
