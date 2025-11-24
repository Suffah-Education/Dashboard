// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import RootReady from "./routes/RootLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Signup from "./auth/Signup";
import Login from "./auth/Login";
import StudentDashboard from "./pages/Student/StudentDashboard";
import Mycourses from "./pages/Student/Mycourses";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import MyBatches from "./pages/Teacher/MyBatches";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Layout from "./components/Layout";
import Batches from "./pages/Student/Batches";
import Mystudents from "./pages/Teacher/Mystudents";
import Myteachers from "./pages/Student/Myteachers";
import Settings from "./pages/Student/Settings";
import Teachersetting from "./pages/Teacher/Teacherprofile";
import Allteachers from "./pages/Admin/Allteachers";
import Allstudents from "./pages/Admin/Allstudents";
import Newteacher from "./pages/Admin/Newteacher";
import Profile from "./pages/Student/Profile";
import Allcourses from "./pages/Admin/Allcourses";
import InReview from "./components/InReview.jsx";
import Editprofilepage from "./pages/Student/Editprofilepage.jsx";
import Innerbatch from "./pages/Teacher/Innerbatch.jsx";
import EditBatch from "./pages/Teacher/EditBatch.jsx";
import PrivacyPolicy from "./pages/Policies/Privacypolicy.jsx";
import TermsConditions from "./pages/Policies/Termsconditions.jsx";
import Innerbatchstudent from "./pages/Student/Innerbatchstudent.jsx";
import EnrolledBatch from "./pages/Student/Enrolledbatch.jsx";
import Editteacherprofile from "./pages/Teacher/Editteacherprofile.jsx";
import TeacherChangePassword from "./pages/Teacher/TeacherChangePassword.jsx";

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

          <Route path="/inreview" element={<InReview />} />
          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <Layout>
                <TermsConditions />
              </Layout>
            }
          />

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
            path="/student/myteachers"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Myteachers />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/batch/:id"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Innerbatchstudent />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/enrolled/:id"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <EnrolledBatch />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/batches"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Batches />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile/editprofilepage"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Editprofilepage />
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
            path="/teacher/teacherprofile/editteacherprofile"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Editteacherprofile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/mystudents"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Mystudents />
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
            path="/teacher/batch/:id"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Innerbatch />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/batch/:id/edit"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <EditBatch />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/teacherprofile"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Teachersetting />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/change-password"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <TeacherChangePassword />
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
          <Route
            path="/admin/allteachers"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Allteachers />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/allstudents"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Allstudents />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/allcourses"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Allcourses />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Newteacher />
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
