import { POINTS } from "./data";

export function calcScore(answers) {
  return answers.filter((answer) => answer.correct)
    .reduce((total, answer) => total + POINTS[answer.level], 0);
}

export function getRank(score) {
  if (score >= 300) return "Rung chuông vàng";
  if (score >= 200) return "Xuất sắc";
  if (score >= 100) return "Khá";
  return "Cần cố gắng";
}
