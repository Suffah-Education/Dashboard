import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const BatchRedirect = () => {
    const { batchId } = useParams();
    const navigate = useNavigate();
    const { token, role } = useAuthStore();

    useEffect(() => {
        if (token) {
            // Smart redirect based on role, defaulting to student view which handles preview/enrollment
            if (role === 'teacher') {
                navigate(`/teacher/batch/${batchId}`);
            } else if (role === 'admin') {
                navigate(`/admin/batch/${batchId}`);
            } else {
                navigate(`/student/batch/${batchId}`);
            }
        } else {
            // Public preview for non-logged-in users
            navigate(`/public/batch/${batchId}`);
        }
    }, [token, role, batchId, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin h-10 w-10 text-green-600 border-4 border-green-200 rounded-full border-t-green-600"></div>
                <h1 className="text-xl font-semibold text-gray-700">Redirecting...</h1>
            </div>
        </div>
    );
};

export default BatchRedirect;
