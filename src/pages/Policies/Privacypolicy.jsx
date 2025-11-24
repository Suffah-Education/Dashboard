import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const PrivacyPolicy = () => {
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
      <h1 className="text-3xl font-bold mb-4">Privacy Policy – Suffah Education</h1>
      <p className="text-sm text-gray-500 mb-6">Last Updated: 14/11/2025</p>

      <p className="mb-4">
        Suffah Education (“we”, “our”, “us”) is committed to protecting your privacy
        and ensuring that your personal information is handled with utmost care,
        ethics, and transparency in accordance with Islamic values.
      </p>

      <p className="mb-6">
        This Privacy Policy explains how we collect, use, store, and safeguard your
        information when you use our website, mobile application, or any services
        provided under Suffah Education.
      </p>

      <h2 className="text-xl font-semibold mb-2">Information Collection</h2>
      <p className="mb-4">
        We do not collect, store, or share unnecessary personal information. Only the
        details you voluntarily provide — such as your name, phone number, email,
        login details, and chosen courses/batches — are processed to maintain your
        learning account.
      </p>
      <p className="mb-6">
        We do not access contacts, photos, device storage, or sensitive data without
        your direct submission.
      </p>

      <h2 className="text-xl font-semibold mb-2">Use of Information</h2>
      <p className="mb-4">
        Any information you share is used strictly to provide and improve Suffah
        Education services, including:
      </p>
      <ul className="list-disc ml-8 mb-6">
        <li>Creating your student/teacher account</li>
        <li>Enabling access to enrolled batches</li>
        <li>Managing learning progress</li>
        <li>Sending schedules & class reminders</li>
        <li>Teacher–student communication</li>
      </ul>

      <p className="mb-6">We do NOT use your information for advertising.</p>

      <h2 className="text-xl font-semibold mb-2">No Third-Party Sharing</h2>
      <p className="mb-6">
        We do not sell, rent, trade, or disclose your personal information.
        Minimal data may be shared only with trusted service providers (hosting,
        SMS/email, payment gateways) necessary for platform operation.
      </p>

      <h2 className="text-xl font-semibold mb-2">Children’s Privacy</h2>
      <p className="mb-6">
        Our platform may be used by minors under parent/teacher supervision. We do not
        knowingly collect personal information from children below 13 years without
        parental consent.
      </p>

      <h2 className="text-xl font-semibold mb-2">Data Security</h2>
      <p className="mb-6">
        Your data is protected using encrypted storage, secure login systems,
        and restricted access controls. We take all possible measures to
        prevent unauthorized access or data loss.
      </p>

      <h2 className="text-xl font-semibold mb-2">Sharing of Information</h2>
      <p className="mb-4">
        Your data may be shared only in the following cases:
      </p>

      <h3 className="text-lg font-semibold mb-1">A) With Teachers</h3>
      <p className="mb-4">
        When you enroll in a batch, your basic profile (name, phone, progress) may be
        visible to your teacher.
      </p>

      <h3 className="text-lg font-semibold mb-1">B) With Service Providers</h3>
      <p className="mb-6">
        Minimal required data may be shared with verified services like hosting,
        payment gateways, or email/SMS systems.
      </p>

      <h2 className="text-xl font-semibold mb-2">Cookies</h2>
      <p className="mb-6">
        We use cookies to keep you logged in, remember preferences, and improve
        performance. You may disable cookies, but some features may stop working.
      </p>

      <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
      <ul className="list-disc ml-8 mb-6">
        <li>Request your personal data</li>
        <li>Request correction</li>
        <li>Request account deletion</li>
        <li>Withdraw login permissions</li>
      </ul>

      <p className="mb-6">
        Contact us: <br />
        📩 <strong>support@suffaheducation.com</strong> <br />
        📞 9999999999
      </p>

      <h2 className="text-xl font-semibold mb-2">Islamic Ethics & Privacy</h2>
      <p>
        We follow Islamic principles of privacy, honesty, and trust.  
        Your data is treated as an **Amanah (trust)** and is used only to assist your
        learning journey.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
