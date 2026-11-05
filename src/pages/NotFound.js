import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return <section className="panel center"><div className="big-number">404</div><h1>Không tìm thấy trang</h1><Link className="button-link primary" to="/">Về trang chủ</Link></section>;
}
