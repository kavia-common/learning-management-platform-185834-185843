import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppState } from "../app/store/AppStateContext";
import "./Layout.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/courses", label: "Courses", icon: "📚" },
  { to: "/assessments/1", label: "Assessments", icon: "📝" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar() {
  const {
    ui: { sidebarOpen },
  } = useAppState();
  const { toggleSidebar } = useAppDispatch();

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
        {sidebarOpen ? "«" : "»"}
      </button>
      <nav className="nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
