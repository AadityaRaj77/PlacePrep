import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ChooseChallenge from "./pages/ChooseChallenge";
import TestPlayer from "./pages/TestPlayer";
import TestResult from "./pages/TestResult";
import Curriculum from "./pages/Curriculum";
import Resume from "./pages/Resume";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Redirect root */}
      <Route
        path="/"
        element={
          localStorage.getItem("token")
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenge" element={<ChooseChallenge />} />
        <Route path="/test/:id" element={<TestPlayer />} />
        <Route path="/result/:id" element={<TestResult />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/resume" element={<Resume />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
