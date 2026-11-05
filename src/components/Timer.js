import React from "react";

export default function Timer({ seconds }) {
  return <div className={`timer ${seconds <= 5 ? "timer-danger" : ""}`}>◷ Còn <b>{seconds}</b> giây</div>;
}
