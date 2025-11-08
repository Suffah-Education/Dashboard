// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import RootReady from "./routes/RootLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Signup from "./auth/Signup";
import Login from "./auth/Login";
import StudentDashboard from "./pages/Student/StudentDashboard";
import Mycourses from "./pages/Student/Mycourses";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import MyBatches from "./pages/Teacher/MyBatches";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Layout from "./components/Layout";

function App() {
  const { token, role } = useAuthStore();

  const getRedirectPath = () => {
    if (!token) return "/login";
    if (role === "student") return "/student";
    if (role === "teacher") return "/teacher";
    if (role === "admin") return "/admin";
    return "/login";
  };

  return (
    <RootReady>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={token ? <Navigate to={getRedirectPath()} /> : <Signup />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to={getRedirectPath()} /> : <Login />}
          />
          <Route path="/" element={<Navigate to={getRedirectPath()} />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <StudentDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/mycourses"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Mycourses />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <TeacherDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/mybatches"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <MyBatches />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to={getRedirectPath()} />} />
        </Routes>
      </BrowserRouter>
    </RootReady>
  );
}

export default App;
