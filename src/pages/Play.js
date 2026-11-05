import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { POINTS, TIME_PER_QUESTION } from "../data";
import { calcScore } from "../utils";
import QuestionCard from "../components/QuestionCard";
import AnswerButton from "../components/AnswerButton";
import Timer from "../components/Timer";
import ScoreBoard from "../components/ScoreBoard";

export default function Play({ questions, playerName, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seconds, setSeconds] = useState(TIME_PER_QUESTION);
  const [status, setStatus] = useState("answering");
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const question = questions[currentIndex];
  const score = calcScore(answers);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((old) => old > 0 ? old - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (status !== "answering" || seconds > 0) return;
    resolveAnswer(null, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, status]);

  useEffect(() => {
    if (status !== "locked") return;
    const timer = setTimeout(() => setStatus("revealed"), 800);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (status !== "revealed") return;
    const timer = setTimeout(() => resolveAnswer(selected, false), 1200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function chooseAnswer(index) {
    if (status !== "answering") return;
    setSelected(index);
    setStatus("locked");
  }

  function resolveAnswer(choice, timedOut) {
    const correct = !timedOut && choice === question.answer;
    const nextAnswers = [...answers, { id: question.id, level: question.level, correct }];
    setAnswers(nextAnswers);

    if (!correct || currentIndex === questions.length - 1) {
      onFinish({
        playerName,
        answers: nextAnswers,
        reason: currentIndex === questions.length - 1 && correct ? "completed" : timedOut ? "timeout" : "wrong"
      });
      return;
    }

    setCurrentIndex((old) => old + 1);
    setSeconds(TIME_PER_QUESTION);
    setSelected(null);
    setStatus("answering");
  }

  if (!question) return <Navigate to="/" replace />;

  return (
    <section className="play-layout">
      <div className="play-main panel">
        <div className="play-top"><span className="eyebrow">ĐANG THI</span><Timer seconds={seconds} /></div>
        <QuestionCard question={question} index={currentIndex} total={questions.length} />
        <div className="answer-grid">
          {question.options.map((option, index) => {
            let answerState = "";
            if (status === "locked" && selected === index) answerState = "answer-selected";
            if (status === "revealed") {
              if (index === question.answer) answerState = "answer-correct";
              else if (selected === index) answerState = "answer-wrong";
            }
            return <AnswerButton key={index} index={index} text={option}
              onClick={chooseAnswer} disabled={status !== "answering"} state={answerState} />;
          })}
        </div>
        {status === "revealed" && <p className={`answer-feedback ${selected === question.answer ? "feedback-good" : "feedback-bad"}`}>
          {selected === question.answer ? `Chính xác! +${POINTS[question.level]} điểm` : "Chưa chính xác!"}
        </p>}
      </div>
      <ScoreBoard answers={answers} currentIndex={currentIndex} score={score} />
    </section>
  );
}
