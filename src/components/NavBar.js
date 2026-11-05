import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">🔔 Rung chuông vàng</Link>
      <nav>
        <NavLink to="/" end>Trang chủ</NavLink>
        <NavLink to="/questions">Ngân hàng câu hỏi</NavLink>
        <NavLink to="/history">Lịch sử</NavLink>
      </nav>
    </header>
  );
}
