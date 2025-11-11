import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

// PUBLIC_INTERFACE
export default function MainLayout() {
  /** Main application layout: header, sidebar, and content area. */
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="content">
          <div className="surface">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
