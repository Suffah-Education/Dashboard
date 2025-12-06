// App.jsx
import { Suspense, lazy, memo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import RootReady from "./routes/RootLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Fast-load auth pages (critical path)
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Layout from "./components/Layout";
import InReview from "./components/InReview.jsx";

// Lazy load all route components for faster initial load
const StudentDashboard = lazy(() => import("./pages/Student/StudentDashboard"));
const Mycourses = lazy(() => import("./pages/Student/Mycourses"));
const TeacherDashboard = lazy(() => import("./pages/Teacher/TeacherDashboard"));
const MyBatches = lazy(() => import("./pages/Teacher/MyBatches"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const Batches = lazy(() => import("./pages/Student/Batches"));
const Mystudents = lazy(() => import("./pages/Teacher/Mystudents"));
const Myteachers = lazy(() => import("./pages/Student/Myteachers"));
const Settings = lazy(() => import("./pages/Student/Settings"));
const Teachersetting = lazy(() => import("./pages/Teacher/Teacherprofile"));
const Allteachers = lazy(() => import("./pages/Admin/Allteachers"));
const Allstudents = lazy(() => import("./pages/Admin/Allstudents"));
const Newteacher = lazy(() => import("./pages/Admin/Newteacher"));
const Profile = lazy(() => import("./pages/Student/Profile"));
const Allcourses = lazy(() => import("./pages/Admin/Allcourses"));
const Editprofilepage = lazy(() => import("./pages/Student/Editprofilepage.jsx"));
const Innerbatch = lazy(() => import("./pages/Teacher/Innerbatch.jsx"));
const EditBatch = lazy(() => import("./pages/Teacher/EditBatch.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/Policies/Privacypolicy.jsx"));
const TermsConditions = lazy(() => import("./pages/Policies/Termsconditions.jsx"));
const Innerbatchstudent = lazy(() => import("./pages/Student/Innerbatchstudent.jsx"));
const EnrolledBatch = lazy(() => import("./pages/Student/Enrolledbatch.jsx"));
const Editteacherprofile = lazy(() => import("./pages/Teacher/Editteacherprofile.jsx"));
const TeacherChangePassword = lazy(() => import("./pages/Teacher/TeacherChangePassword.jsx"));
const AdminBatch = lazy(() => import("./pages/Admin/AdminBatch.jsx"));
const TeacherRequestDetails = lazy(() => import("./pages/Admin/TeacherRequestDetails.jsx"));

// Reusable loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full min-h-screen">
    <div className="animate-spin h-10 w-10 text-blue-600 border-4 border-blue-200 rounded-full border-t-blue-600"></div>
  </div>
);

const App = memo(function App() {
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
                  <Suspense fallback={<LoadingFallback />}>
                    <StudentDashboard />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/mycourses"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Mycourses />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/myteachers"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Myteachers />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/batch/:id"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Innerbatchstudent />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/enrolled/:id"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <EnrolledBatch />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/batches"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Batches />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Profile />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile/editprofilepage"
            element={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Editprofilepage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />





          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <TeacherDashboard />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/teacherprofile/editteacherprofile"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Editteacherprofile />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/mystudents"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Mystudents />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/mybatches"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <MyBatches />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/batch/:id"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Innerbatch />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/batch/:id/edit"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <EditBatch />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/teacherprofile"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Teachersetting />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/change-password"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <TeacherChangePassword />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />





          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminDashboard />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/allteachers"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Allteachers />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/admin/allstudents"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Allstudents />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/admin/allcourses"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Allcourses />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/batch/:id"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminBatch />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/teacher/:id"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <TeacherRequestDetails />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Newteacher />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to={getRedirectPath()} />} />

        </Routes>
      </BrowserRouter>
    </RootReady>
  );
});

export default App;
