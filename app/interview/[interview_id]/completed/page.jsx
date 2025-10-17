import React from "react";
import { CheckCircle } from "lucide-react"; // optional icon library

function InterviewComplete() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-2xl p-10 flex flex-col items-center w-full max-w-xl">
        <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Interview Complete!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Thank you for participating in the AI-driven interview with Alcruiter.
        </p>

        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="Interview Illustration"
          className="w-64 h-64 object-contain mb-6"
        />

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            What’s Next?
          </h2>
          <p className="text-gray-600 mb-1">
            The recruiter will review your interview responses and will contact you soon regarding the next steps.
          </p>
          <p className="text-gray-500 text-sm">
            ⏱ Response within 2–3 business days
          </p>
        </div>
      </div>
    </div>
  );
}

export default InterviewComplete;
