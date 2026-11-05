import React from "react";

export default function Helpers({ used, onUse, status, lifeline }) {
  return (
    <div className="helpers">
      <button disabled={status !== "answering" || used.fifty} onClick={() => onUse("fifty")}>✂️ Loại 1 đáp án {used.fifty && "✓"}</button>
      <button disabled={status !== "answering" || used.extra} onClick={() => onUse("extra")}>⏱ Thêm 15 giây {used.extra && "✓"}</button>
      <button className={lifeline ? "lifeline-active" : ""} disabled={status !== "answering" || used.lifeline || lifeline} onClick={() => onUse("lifeline")}>{lifeline ? "🛟 Phao đang bật" : "🛟 Phao cứu sinh"} {used.lifeline && "✓"}</button>
    </div>
  );
}
