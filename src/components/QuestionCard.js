import React from "react";
import { LEVELS } from "../data";

export default function QuestionCard({ question, index, total }) {
  return (
    <div className="question-card">
      <div className="question-meta">
        <span>Câu {index + 1}/{total}</span><span>{question.topic}</span><span>{LEVELS[question.level]}</span>
      </div>
      <h2>{question.question}</h2>
    </div>
  );
}
