import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppState } from "./store/AppStateContext";
import MainLayout from "../layout/MainLayout";
import NotFound from "../features/common/NotFound";

// Placeholder pages
const Placeholder = ({ title }) => (
  <div style={{ padding: "1rem" }}>
    <h1 style={{ margin: "0 0 0.5rem" }}>{title}</h1>
    <p>Content coming soon.</p>
  </div>
);

// PUBLIC_INTERFACE
export function ProtectedRoute({ children }) {
  /** Guard that redirects to /login when no auth token is present. */
  const {
    auth: { token },
  } = useAppState();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Register application routes and nested layout. */
  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/login" element={<Placeholder title="Login" />} />
      <Route path="/register" element={<Placeholder title="Register" />} />
      <Route path="/forgot-password" element={<Placeholder title="Forgot Password" />} />

      {/* Protected routes under MainLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Placeholder title="Dashboard" />} />
        <Route path="courses" element={<Placeholder title="Courses" />} />
        <Route path="courses/:courseId" element={<Placeholder title="Course Details" />} />
        <Route
          path="courses/:courseId/lessons/:lessonId"
          element={<Placeholder title="Lesson" />}
        />
        <Route
          path="assessments/:assessmentId"
          element={<Placeholder title="Assessment" />}
        />
        <Route path="profile" element={<Placeholder title="Profile" />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
