import React from "react";
import { IntervueHeading } from "../components/common/Icons";

const WaitingForTeacher = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <IntervueHeading />
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-[#500ECE] border-t-transparent mx-auto mb-4"></div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Wait for the teacher to ask questions..
        </h2>
      </div>
    </div>
  );
};

export default WaitingForTeacher;
