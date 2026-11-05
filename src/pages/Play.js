import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { POINTS, TIME_PER_QUESTION, EXTRA_TIME } from "../data";
import { calcScore } from "../utils";
import QuestionCard from "../components/QuestionCard";
import AnswerButton from "../components/AnswerButton";
import Timer from "../components/Timer";
import ScoreBoard from "../components/ScoreBoard";
import Helpers from "../components/Helpers";

export default function Play({ questions, playerName, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seconds, setSeconds] = useState(TIME_PER_QUESTION);
  const [status, setStatus] = useState("answering");
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [used, setUsed] = useState({ fifty: false, extra: false, lifeline: false });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [lifeline, setLifeline] = useState(false);
  const question = questions[currentIndex];
  const score = calcScore(answers);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((old) => old > 0 ? old - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (status !== "answering") return;
      const number = Number(event.key);
      if (number >= 1 && number <= 4 && !hiddenOptions.includes(number - 1)) chooseAnswer(number - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    if (status !== "answering" || seconds > 0) return;
    resolveAnswer(null, true);
    // Chỉ xử lý một lần khi đồng hồ về 0.
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
    if (status !== "answering" || hiddenOptions.includes(index)) return;
    setSelected(index);
    setStatus("locked");
  }

  function resolveAnswer(choice, timedOut) {
    const correct = !timedOut && choice === question.answer;
    const passedByLifeline = lifeline;
    const record = { id: question.id, level: question.level, correct, lifeline: passedByLifeline && !correct };
    const nextAnswers = [...answers, record];
    setAnswers(nextAnswers);

    if ((!correct && !passedByLifeline) || currentIndex === questions.length - 1) {
      onFinish({ playerName, answers: nextAnswers, reason: currentIndex === questions.length - 1 && (correct || passedByLifeline) ? "completed" : timedOut ? "timeout" : "wrong" });
      return;
    }
    setCurrentIndex((old) => old + 1);
    setSeconds(TIME_PER_QUESTION);
    setSelected(null);
    setHiddenOptions([]);
    setLifeline(false);
    setStatus("answering");
  }

  function useHelper(type) {
    if (status !== "answering" || used[type]) return;
    setUsed((old) => ({ ...old, [type]: true }));
    if (type === "fifty") {
      const wrong = question.options.map((_, i) => i).filter((i) => i !== question.answer && !hiddenOptions.includes(i));
      if (wrong.length) setHiddenOptions((old) => [...old, wrong[Math.floor(Math.random() * wrong.length)]]);
    } else if (type === "extra") {
      setSeconds((old) => old + EXTRA_TIME);
    } else setLifeline(true);
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
            return <AnswerButton key={index} index={index} text={hiddenOptions.includes(index) ? "Đáp án đã bị loại" : option}
              onClick={chooseAnswer} disabled={status !== "answering" || hiddenOptions.includes(index)} state={answerState} />;
          })}
        </div>
        <Helpers used={used} onUse={useHelper} status={status} lifeline={lifeline} />
        {status === "revealed" && <p className={`answer-feedback ${selected === question.answer ? "feedback-good" : "feedback-bad"}`}>
          {selected === question.answer ? `Chính xác! +${POINTS[question.level]} điểm` : lifeline ? "Phao cứu sinh đã giúp bạn qua câu này." : "Chưa chính xác!"}
        </p>}
        <p className="keyboard-hint">Mẹo: nhấn phím 1, 2, 3, 4 để chọn A, B, C, D.</p>
      </div>
      <ScoreBoard answers={answers} currentIndex={currentIndex} score={score} />
    </section>
  );
}
