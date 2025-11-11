import React from "react";
import { useAppDispatch, useAppState } from "../app/store/AppStateContext";
import "./Layout.css";

export default function Header() {
  const {
    ui: { theme },
    auth: { user },
  } = useAppState();
  const { setTheme } = useAppDispatch();

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="brand">LMS</span>
      </div>
      <div className="header-right">
        <button className="btn-ghost" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className="user-menu">
          <div className="avatar" aria-label="User avatar">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="user-name">{user?.name || "Guest"}</div>
        </div>
      </div>
    </header>
  );
}
