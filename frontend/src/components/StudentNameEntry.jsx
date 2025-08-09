import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { IntervueHeading } from "./common/Icons";
import ContinueButton from "./common/ContinueButton";

const StudentNameEntry = ({ onNameSubmit }) => {
  const [name, setName] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(setUser({ name: name.trim(), role: user.role }));
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <div className="max-w-2xl flex flex-col items-center">
        <div className="text-center mb-8">
          <IntervueHeading />
          <h1 className="text-4xl mb-2 font-normal">
            Let's <span className="font-semibold">Get Started</span>
          </h1>
          <p className="text-gray-600">
            If you're a student, you'll be able to{" "}
            <span className="font-semibold text-black">
              submit your answers
            </span>
            , participate in live polls, and see how your responses compare with
            your classmates
          </p>
        </div>
        <div className="flex w-full justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-6 w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
              >
                Enter your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Bajaj"
                className="w-full px-3 py-5 border-none outline-none border-gray-300 bg-[#F2F2F2] rounded-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex justify-center">
            <ContinueButton
              onClick={handleSubmit}
              selectedRole={name.trim() !== ""}
              className=""
            >
              Continue
            </ContinueButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentNameEntry;
