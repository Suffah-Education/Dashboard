import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

const PublicBatch = () => {
    const { id } = useParams();

    const { data: batch, isLoading, error } = useQuery({
        queryKey: ['publicBatch', id],
        queryFn: async () => {
            const res = await api.get(`/batches/public/${id}`);
            return res.data;
        },
        retry: false
    });

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin h-8 w-8 text-blue-600 border-4 border-blue-200 rounded-full border-t-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <p className="text-lg text-red-500 font-medium">Batch not found or restricted.</p>
            <Link to="/" className="text-blue-600 hover:underline">Go Home</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{batch.name}</h1>
                    <p className="text-blue-100 text-lg">{batch.description || "No description available."}</p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Key Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">Teacher</p>
                            <p className="text-xl font-medium text-gray-800">{batch.teacher?.name || "Suffah Faculty"}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">Price</p>
                            <p className="text-xl font-bold text-green-600">
                                {batch.price ? `₹${batch.price}` : "Free"}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">Start Date</p>
                            <p className="text-lg text-gray-800">
                                {batch.startDate ? new Date(batch.startDate).toLocaleDateString() : "TBA"}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">Duration</p>
                            <p className="text-lg text-gray-800">{batch.duration || "N/A"}</p>
                        </div>
                    </div>

                    {/* Syllabus Section */}
                    {batch.syllabus && batch.syllabus.length > 0 && (
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">Course Syllabus</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {batch.syllabus.map((topic, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-blue-500 mt-1">•</span> {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Action Area */}
                    <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-gray-600 font-medium">Interested in this batch?</p>
                            <p className="text-sm text-gray-500">Log in or sign up to enroll and access materials.</p>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <Link to="/login" className="flex-1 md:flex-none px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition text-center">
                                Log In
                            </Link>
                            <Link to="/signup" className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg transition text-center">
                                Enroll Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicBatch;
