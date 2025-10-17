import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react"; // ✅ import icons
import moment from "moment";
import { toast } from "sonner";
import Link from "next/link";

function InterviewCard({ interview, viewDetail = false }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Copied");
  };
  const onSend = () => {
    window.location.href =
      "mailto:mahimakathpal0@gmail.com?subject=AiCruiter Interview Link &body = Interview Link:" +
      url;
  };
  return (
    <div className="p-5 bg-white rounded-lg border ">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
        <h2 className="text-sm ">
          {moment(interview?.created_at).format("DD MMM YYYY")}
        </h2>
      </div>

      <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>
      <h2 className="mt-2 flex justify-between text-gray-500">
        {interview?.duration}
        <span className="text-green-700">
          {interview["interview_feedback"]?.length} Candidates
        </span>
      </h2>

      {!viewDetail ? (
<div className="flex flex-row justify-between mt-5 gap-4">
  <Button
    variant="outline"
    className="flex-1"
    onClick={copyLink}
  >
    <Copy className="mr-2 h-4 w-4" />
    Copy Link
  </Button>
  
  <Button
    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
    onClick={onSend}
  >
    <Send className="mr-2 h-4 w-4" />
    Send
  </Button>
</div>

      ) : (
        <Link
          href={"/scheduled-interview/" + interview?.interview_id + "/details"}
        >
          <Button className="mt-5 w-full" variant="outline">
            View Details <ArrowRight />{" "}
          </Button>{" "}
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
