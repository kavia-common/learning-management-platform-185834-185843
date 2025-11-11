import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Simple 404 page. */
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>404 - Not Found</h1>
      <p style={{ marginBottom: "1rem" }}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" style={{ color: "var(--primary)" }}>Go to Home</Link>
    </div>
  );
}
