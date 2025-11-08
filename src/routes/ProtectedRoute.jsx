// import { Navigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";

// /**
//  * ProtectedRoute:
//  * - token check karta hai
//  * - role match karta hai (agar prop diya gaya ho)
//  * - agar pass nahi hua => redirect /login
//  */
// export default function ProtectedRoute({ children, allowedRole }) {
//   const { token, role, hydrated } = useAuthStore();

//   // If the auth store hasn't finished rehydration yet,
//   // show a loader instead of redirecting — this prevents
//   // a brief flicker where the app redirects to /login while
//   // the store is still being populated.
//   if (!hydrated) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//         <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-10 h-10 mb-3"></div>
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   if (!token) {
//     // user not logged-in
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRole && role !== allowedRole) {
//     // role mismatch (e.g. teacher trying student page)
//     return <Navigate to="/login" replace />;
//   }

//   // everything ok, render children
//   return children;
// }



import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children, allowedRole }) {
  const { token, role } = useAuthStore();

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/login" replace />;

  return children;
}

