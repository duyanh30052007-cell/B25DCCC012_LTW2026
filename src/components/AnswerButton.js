import React from "react";
import { LETTERS } from "../data";

export default function AnswerButton({ index, text, onClick, disabled, state }) {
  return (
    <button className={`answer-button ${state || ""}`} disabled={disabled} onClick={() => onClick(index)}>
      <span className="answer-letter">{LETTERS[index]}</span><span>{text}</span>
    </button>
  );
}
