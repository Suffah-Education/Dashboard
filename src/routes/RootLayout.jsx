// src/components/RootReady.jsx
import { useAuthStore } from "../store/useAuthStore";

export default function RootReady({ children }) {
  const { ready } = useAuthStore();

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-10 h-10 mb-3"></div>
        <p className="text-gray-600">Preparing app...</p>
      </div>
    );
  }

  return children;
}
