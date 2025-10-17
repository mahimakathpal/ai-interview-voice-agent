"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Clock, Share2, UserCheck, FileText } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
{/* Hero Section */}
<header className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
  {/* Logo */}
  <Image
    src="/logo.png"
    alt="Aicruiter Logo"
    width={200}
    height={200}
    className="mb-8"
  />

  {/* Main Heading */}
  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
    AI-Powered <span className="text-blue-600">Interview Assistant</span> for
    Modern Recruiters
  </h1>

  {/* Subheading */}
  <p className="text-gray-700 dark:text-gray-300 max-w-3xl text-lg md:text-xl leading-relaxed mb-5">
    Let our AI voice agent conduct candidate interviews while you focus on
    finding the perfect match. Save time, reduce bias, and improve your hiring
    process.
  </p>

  {/* CTA Buttons */}
 
    <Button
      onClick={handleLogin}
      className="px-8  text-lg rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
    >
     Get Started
    </Button>

 
</header>


      {/* Benefits Section */}
      <section className=" py-10 px-5 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose AiCruiter?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <Clock className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold mb-3">Streamline Your Hiring Process</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              AiCruiter helps you save time and find better candidates with our advanced AI interview technology.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <Share2 className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold mb-3">Save Time</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Automate initial screening interviews and focus on final candidates.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <FileText className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold mb-3">Data-Driven Insights</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get detailed analytics and candidate comparisons based on interview responses.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <UserCheck className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold mb-3">Reduce Bias</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Standardized interviews help eliminate unconscious bias in the hiring process.
            </p>
          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-5 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="flex gap-4 items-start">
            <span className="font-bold text-blue-500 text-2xl">1</span>
            <div>
              <h3 className="text-xl font-semibold mb-2">Create Job</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Add job position, description, type, and duration. AI prepares the interview questions.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="font-bold text-blue-500 text-2xl">2</span>
            <div>
              <h3 className="text-xl font-semibold mb-2">Share Link</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Generate a unique interview link and share it with candidates.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="font-bold text-blue-500 text-2xl">3</span>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI Interviews</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Candidates interact with the AI interviewer powered by VAPI.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <span className="font-bold text-blue-500 text-2xl">4</span>
            <div>
              <h3 className="text-xl font-semibold mb-2">Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                AI generates detailed feedback for each candidate, visible in the Schedule Interview section.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-5 text-center bg-gradient-to-r from-blue-500 to-indigo-400 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Recruiting Smarter Today</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl">
          Streamline your hiring process, save time, and make data-driven decisions with AI-assisted interviews.
        </p>
        <Button 
          onClick={handleLogin} 
          className="px-10 py-4 text-lg rounded-lg bg-white text-blue-500 hover:bg-gray-100 transition"
        >
          Login to Get Started
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Aicruiter. All rights reserved.
      </footer>

    </div>
  );
}
