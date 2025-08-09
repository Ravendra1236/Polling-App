import React from "react";
import { IntervueHeading } from "./common/Icons";

const KickedOut = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <IntervueHeading/>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          You've been Kicked out !
        </h1>

        <p className="text-gray-600 mb-6">
          Looks like the teacher had removed you from the poll system. Please
          Try again sometime.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default KickedOut;
