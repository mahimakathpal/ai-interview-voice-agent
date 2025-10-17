import React from "react";
import { Clock, Calendar, Tag } from "lucide-react"; // ✅ Import Calendar too
import moment from "moment"; // ✅ Import moment for date formatting

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className="p-5 bg-white rounded-lg mt-5 shadow-sm border">
      {/* Job Title */}
      <h2 className="text-xl font-bold">{interviewDetail?.jobPosition}</h2>

      {/* Top Info Section */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 lg:pr-52">
        {/* Duration */}
        <div>
          <h2 className="text-sm text-gray-500">Duration</h2>
          <h2 className="flex mt-1 text-sm font-bold items-center gap-2">
            <Clock className="h-4 w-4" /> {interviewDetail?.duration || "N/A"}
          </h2>
        </div>

        {/* Created On */}
        <div>
          <h2 className="text-sm text-gray-500">Created On</h2>
          <h2 className="flex mt-1 text-sm font-bold items-center gap-2">
            <Calendar className="h-4 w-4" />
            {interviewDetail?.created_at
              ? moment(interviewDetail.created_at).format("MMM DD, YYYY")
              : "N/A"}
          </h2>
        </div>

        {/* Type */}
{interviewDetail?.type && (
  <div>
    <h2 className="text-sm text-gray-500 mb-1">Type</h2>
    <div className="flex flex-wrap items-center gap-2 mt-1">
      <Tag className="h-4 w-4 text-gray-600" />
      {(() => {
        try {
          const parsedType = JSON.parse(interviewDetail.type);
          return Array.isArray(parsedType) ? (
            parsedType.map((t, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
              >
                {t}
              </span>
            ))
          ) : (
            <span>{interviewDetail.type}</span>
          );
        } catch {
          return <span>{interviewDetail.type}</span>;
        }
      })()}
    </div>
  </div>
)}

      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h2 className="font-bold">Job Description</h2>
        <p className="text-sm leading-6 text-gray-700">
          {interviewDetail?.jobDescription || "No description available."}
        </p>
      </div>

      {/* Questions */}
      <div className="mt-5">
        <h2 className="font-bold">Interview Questions</h2>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {interviewDetail?.questionList?.length > 0 ? (
            interviewDetail.questionList.map((item, index) => (
              <h2 key={index} className="text-xs flex">
                {index + 1}. {item?.question}
              </h2>
            ))
          ) : (
            <p className="text-sm text-gray-500">No questions available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailContainer;
