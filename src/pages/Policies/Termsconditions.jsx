import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsConditions = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-4xl mx-auto p-8 text-gray-800 leading-relaxed">
            <button
                onClick={() => navigate(-1)} // ek kadam peeche jaata hai
                className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition-colors bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md"
            >
                <ArrowLeft size={18} />
                {/* <span className="font-medium text-sm">{label}</span> */}
            </button>
            <h1 className="text-3xl font-bold mb-4">Terms & Conditions – Suffah Education</h1>

            <p className="mb-6">
                By accessing and using Suffah Education, you agree to comply with the following
                terms. Please read them carefully before using our services.
            </p>

            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p className="mb-6">
                By using our website, you agree to these Terms & Conditions, our Privacy Policy,
                and all laws related to online Arabic education and Islamic studies.
                If you disagree with any part, do not use our platform.
            </p>

            <h2 className="text-xl font-semibold mb-2">2. Description of Services</h2>
            <p className="mb-6">
                Suffah Education provides online Arabic language courses and Islamic Studies
                classes. The platform delivers a variety of learning resources for students
                worldwide.
            </p>

            <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
            <ul className="list-disc ml-8 mb-6">
                <li>
                    <strong>Account Creation:</strong> You must create an account with valid and
                    complete information.
                </li>
                <li>
                    <strong>Security:</strong> You are responsible for keeping login details safe
                    and reporting any unauthorized activity immediately.
                </li>
                <li>
                    <strong>Prohibited Activities:</strong> Illegal, abusive, or inappropriate
                    behavior is strictly prohibited.
                </li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
            <p className="mb-4">
                All content (text, graphics, videos, class materials) is the exclusive property
                of Suffah Education.
            </p>
            <p className="mb-6">
                Content may only be used for personal learning. Reproduction or commercial use
                is not allowed.
            </p>

            <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
            <p className="mb-6">
                Suffah Education is not responsible for any damages arising from the use of our
                platform, including technical issues, loss of data, or misuse.
            </p>

            <h2 className="text-xl font-semibold mb-2">6. Modification of Terms</h2>
            <p className="mb-6">
                We may update these terms anytime. Users will be notified in case of major
                changes.
            </p>

            <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
            <p className="mb-6">
                These terms follow Indian law (UGC guidelines). Any disputes will be handled in
                Beed courts.
            </p>

            <h2 className="text-xl font-semibold mb-2">8. Contact Information</h2>
            <p className="mb-6">
                Email: <strong>Info@metafuturetechnology.com</strong>
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-bold mb-2">اردو ورژن</h2>
            <p className="leading-loose">
                طباوض و طئارش یک لامعتسا ےیل ےک "نشیکوجیا حافس" و طئارش نا پآ ،ےکرک لامعتسا روا یئاسر
                کت ٹئاس بیو یرامہ ! دیدمآ شوخ
                <br /><br />
                (Full Urdu text same as you provided…)
            </p>
        </div>
    );
};

export default TermsConditions;
