import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="container"><Outlet /></main>
      <footer>TH02 · Lập trình Web · ReactJS</footer>
    </div>
  );
}
