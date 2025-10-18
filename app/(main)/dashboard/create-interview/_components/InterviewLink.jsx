"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  List,
  Mail,
  Plus,
  MessageSquare,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function InterviewLink({ interview_id, formData }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link Copied");
  };

  // Share via Email
  const shareViaEmail = () => {
    const subject = encodeURIComponent("Your AI Interview Link");
    const body = encodeURIComponent(
      `Hi,\n\nPlease use the following link to start your AI interview:\n${url}\n\nBest regards,\nAI Recruiter`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  // Share via WhatsApp
  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Hi, here’s your AI interview link: ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // Share via Slack
  const shareViaSlack = () => {
    const text = encodeURIComponent(`AI Interview Link: ${url}`);
    window.open(`https://slack.com/app_redirect?message=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Image
        src="/check.png"
        alt="check"
        width={200}
        height={200}
        className="w-[50px] h-[50px]"
      />
      <h2 className="font-bold text-lg mt-4">Your AI Interview is Ready!</h2>
      <p className="mt-3 text-center text-gray-600">
        Share this link with your candidates to start the interview process.
      </p>

      {/* Interview Link Box */}
      <div className="w-full p-7 mt-6 rounded-lg bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-50 rounded-full text-xs">
            Valid for 30 Days
          </h2>
        </div>

        <div className="mt-3 flex gap-3 items-center">
          <Input defaultValue={url} disabled />
          <Button onClick={onCopyLink}>
            <Copy className="h-4 w-4 mr-1" /> Copy Link
          </Button>
        </div>

        <hr className="my-5" />

        <div className="flex gap-5 text-sm text-gray-500">
          <h2 className="flex gap-2 items-center">
            <Clock className="h-4 w-4" /> {formData?.duration || "N/A"}
          </h2>
     
          {/* <h2 className="flex gap-2 items-center">
            <Calendar className="h-4 w-4" /> {formData?.date || "N/A"}
          </h2> */}
        </div>
      </div>

      {/* Share Options */}
      <div className="mt-7 bg-white p-5 rounded-lg w-full shadow-sm">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex gap-4 mt-3 flex-wrap">
          <Button variant="outline" onClick={shareViaEmail}>
            <Mail className="h-4 w-4 mr-2" /> Email
          </Button>
          <Button variant="outline" onClick={shareViaSlack}>
            <MessageSquare className="h-4 w-4 mr-2 text-indigo-600" /> Slack
          </Button>
          <Button variant="outline" onClick={shareViaWhatsApp}>
            <PhoneCall className="h-4 w-4 mr-2 text-green-600" /> WhatsApp
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex w-full gap-5 justify-between mt-6">
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
    
      </div>
    </div>
  );
}

export default InterviewLink;
