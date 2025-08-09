import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { IntervueHeading, StarIcon } from "./common/Icons";

const Welcome = ({ onContinue }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const dispatch = useDispatch();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      dispatch(setUser({ name: "", role: selectedRole }));
      onContinue(selectedRole);
    }
  };

  return (
    <div className="container min-h-screen max-w-3xl flex flex-col  h-full justify-center items-center mx-auto">
      <div className="text-center mb-8 max-w-2xl">
        <IntervueHeading />
        <h1 className="text-4xl mb-2 font-normal">
          Welcome to the{" "}
          <span className="font-semibold">Live Polling System</span>
        </h1>
        <p className="text-[#00000080] font-normal text-[19px]">
          Please select the role that best describes you to begin using the live
          polling system.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-9 mb-12">
        <div
          className={`p-[2px] rounded-lg cursor-pointer transition-colors ${
            selectedRole === "student"
              ? "bg-gradient-to-r from-[#7765DA] to-[#1D68BD]"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handleRoleSelect("student")}
        >
          <div className="bg-white rounded-lg py-4 pl-[25px] pr-[17px]">
            <h3 className="font-semibold text-gray-900 text-[23px]">
              I'm a Student
            </h3>
            <p className="text-base font-normal text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
          </div>
        </div>

        <div
          className={`p-[2px] rounded-lg cursor-pointer transition-colors ${
            selectedRole === "teacher"
              ? "bg-gradient-to-r from-[#7765DA] to-[#1D68BD]"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handleRoleSelect("teacher")}
        >
         <div className="bg-white rounded-lg py-4 pl-[25px] pr-[17px]">
            <h3 className="font-semibold text-gray-900 text-[23px]">
            I'm a Teacher
          </h3>
          <p className="text-base text-gray-600 font-normal">
            Submit answers and View live poll results in real-time.
          </p>
        </div>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedRole}
        className={`py-[17px] rounded-[34px] px-[70px] font-medium transition-colors ${
          selectedRole
            ? "bg-gradient-to-r from-[#8F64E1] to-[#1D68BD]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
};

export default Welcome;
