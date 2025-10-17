"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import { supabase } from "@/services/supabaseClient";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // --- TIMER ---
  useEffect(() => {
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => {
    const hrs = String(Math.floor(s / 3600)).padStart(2, "0");
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // --- START CALL ---
  useEffect(() => {
    if (interviewInfo) startCall();
  }, [interviewInfo]);

  const startCall = () => {
    const questionsArray =
      interviewInfo?.questionList?.map((item) => item?.question) || [];
    const questionList = questionsArray.join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.jobPosition}?`,
      transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
      voice: { provider: "playht", voiceId: "jennifer" },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Ask one question at a time, wait for answers, and give brief feedback.
Questions: ${questionList}
After finishing, summarize their performance and end the interview positively.
Keep responses natural and short. Focus on React and technical clarity.
            `.trim(),
          },
        ],
      },
    };
    vapi.start(assistantOptions);
  };

  // --- STOP INTERVIEW ---
  const stopInterview = async () => {
    vapi.stop();
    toast("Interview stopped. Generating feedback...");
    setTimeout(() => GenerateFeedback(), 2000);
  };

  // --- EVENT HANDLERS ---
  useEffect(() => {
    const handleMessage = (message) => {
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        setConversation(convoString);
      }
    };

    const handleCallStart = () => toast("Call connected...");
    const handleSpeechStart = () => setActiveUser(false);
    const handleSpeechEnd = () => setActiveUser(true);
    const handleCallEnd = () => {
      toast("Interview ended. Please wait...");
      setTimeout(() => GenerateFeedback(), 2000);
    };

    // Register all events
    vapi.on("message", handleMessage);
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);

    // Cleanup properly
    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
    };
  }, []);

  // --- FEEDBACK GENERATION ---
  const GenerateFeedback = async () => {
    if (!conversation) {
      toast.error("No conversation data found");
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post("/api/ai-feedback", { conversation });
      const content = result?.data?.content;
      const FINAL_CONTENT = content?.replace(/```json|```/g, "").trim();

      const { error } = await supabase.from("interview_feedback").insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id,
          feedback: JSON.parse(FINAL_CONTENT),
          recommended: false,
        },
      ]);

      if (error) throw error;

      toast.success("Feedback saved successfully!");
      router.replace('/interview/'+ interview_id + "/completed");
    } catch (err) {
      console.error(err);
      toast.error("Error generating feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between items-center">
        AI Interview Session
        <span className="flex gap-2 items-center text-gray-600">
          <Timer /> {formatTime(seconds)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <Image
            src="/ai.png"
            alt="AI Recruiter"
            width={100}
            height={100}
            className="w-[80px] h-[80px] rounded-full object-cover"
          />
          <h2>AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="w-[80px] h-[80px] bg-primary text-white rounded-full flex items-center justify-center text-5xl font-semibold">
            {interviewInfo?.userName?.[0]?.toUpperCase() || "U"}
          </div>
          <h2>{interviewInfo?.userName || "User"}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 mt-7 justify-center">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full" />
        {!loading ? (
          <Phone
            onClick={stopInterview}
            className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer hover:opacity-80 transition"
          />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview in Progress...
      </h2>
    </div>
  );
}

export default StartInterview;
