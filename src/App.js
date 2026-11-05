import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QuestionBank from "./pages/QuestionBank";
import QuestionDetail from "./pages/QuestionDetail";
import NotFound from "./pages/NotFound";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState("");

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

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home playerName={playerName} setPlayerName={setPlayerName} />} />
        <Route path="questions" element={<QuestionBank questions={questions} loading={loading} error={error} />} />
        <Route path="questions/:id" element={loading ? <p className="notice">Đang tải câu hỏi...</p> : error ? <p className="notice error">Không tải được câu hỏi.</p> : <QuestionDetail questions={questions} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
