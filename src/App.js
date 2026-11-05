import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { HISTORY_KEY } from "./data";
import { calcScore, getRank } from "./utils";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Result from "./pages/Result";
import History from "./pages/History";
import QuestionBank from "./pages/QuestionBank";
import QuestionDetail from "./pages/QuestionDetail";
import NotFound from "./pages/NotFound";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch { return []; }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    axios.get("/data/questions.json", { signal: controller.signal })
      .then((response) => { setQuestions(response.data); setLoading(false); })
      .catch((err) => {
        if (err.code === "ERR_CANCELED") return;
        setError(true);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  function finishGame({ playerName: name, answers, reason }) {
    const score = calcScore(answers);
    const correctCount = answers.filter((item) => item.correct).length;
    const result = { playerName: name, answers, reason, score, correctCount, rank: getRank(score) };
    const historyItem = {
      id: `${Date.now()}-${Math.random()}`, name, score, rank: result.rank, correctCount,
      playedAt: new Date().toLocaleString("vi-VN")
    };
    setHistory((old) => [...old, historyItem]);
    navigate("/result", { replace: true, state: result });
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home playerName={playerName} setPlayerName={setPlayerName} history={history} />} />
        <Route path="play" element={!playerName.trim() ? <Navigate to="/" replace /> : loading ? <p className="notice">Đang tải câu hỏi...</p> : error ? <p className="notice error">Không tải được câu hỏi.</p> : <Play key={Date.now()} questions={questions} playerName={playerName.trim()} onFinish={finishGame} />} />
        <Route path="result" element={<Result />} />
        <Route path="history" element={<History history={history} clearHistory={() => setHistory([])} />} />
        <Route path="questions" element={<QuestionBank questions={questions} loading={loading} error={error} />} />
        <Route path="questions/:id" element={loading ? <p className="notice">Đang tải câu hỏi...</p> : error ? <p className="notice error">Không tải được câu hỏi.</p> : <QuestionDetail questions={questions} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
