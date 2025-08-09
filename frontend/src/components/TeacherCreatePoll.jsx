import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPoll, clearError } from "../store/pollSlice";
import { useSocket } from "../hooks/useSocket";
import { IntervueHeading } from "./common/Icons";
import ContinueButton from "./common/ContinueButton";

const TeacherCreatePoll = ({ onPollCreated }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [timer, setTimer] = useState(60);
  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.poll);
  const socket = useSocket();

  // Clear any errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (correctAnswer === index) {
        setCorrectAnswer(null);
      } else if (correctAnswer > index) {
        setCorrectAnswer(correctAnswer - 1);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous validation error
    setValidationError("");

    if (!question.trim() || options.some((opt) => !opt.trim())) {
      return;
    }

    // Check if at least one correct option is selected
    if (correctAnswer === null) {
      setValidationError("Please select at least one correct option");
      return;
    }

    console.log("Creating poll with data:", {
      question: question.trim(),
      options: options.filter((opt) => opt.trim()),
      timer,
      correctAnswer,
    });

    const pollData = {
      question: question.trim(),
      options: options.filter((opt) => opt.trim()),
      timer,
      correctAnswer,
    };

    try {
      const result = await dispatch(createPoll(pollData)).unwrap();
      console.log("Poll created successfully:", result);

      // Emit socket event for real-time updates
      if (socket) {
        socket.emit("new-poll", result);
      }

      onPollCreated(result);
    } catch (error) {
      console.error("Failed to create poll:", error);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col w-full">
      <div className="min-h-0 h-full overflow-hidden">
        <div className="pl-28 pt-20 max-w-5xl">
          <div className="mb-8">
            <IntervueHeading />
            <h1 className="text-4xl mb-2 font-normal">
              Let's <span className="font-semibold">Get Started</span>
            </h1>
            <p className="text-black/50 font-normal text-[19px] max-w-3xl">
              You'll have the ability to create and manage polls, ask questions,
              and monitor your student's responses in real-time.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xl font-semibold ">
                  Enter your question
                </label>
                <select
                  value={timer}
                  onChange={(e) => setTimer(Number(e.target.value))}
                  className="px-[18px] py-2.5 rounded-lg bg-[#F1F1F1] focus:outline-none focus:ring-0 border-0 focus:ring-purple-500 text-sm"
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>60 seconds</option>
                  <option value={90}>90 seconds</option>
                  <option value={120}>120 seconds</option>
                </select>
              </div>
              <div className="bg-[#F2F2F2] pt-3 pb-6 pr-4">
                <textarea
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Rahul Bajaj"
                  className="w-full px-3 rounded-[2px] h-20 focus:outline-none bg-transparent focus:ring-0 resize-none"
                  required
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {question.length}/100
                </div>
              </div>
            </div>

            <div className="max-w-3xl">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xl font-semibold ">
                  Edit Options
                </label>
                <label className="block text-xl font-semibold">
                  Is it Correct?
                </label>
              </div>

              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-l from-[#8F64E1] to-[#4E377B] rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {String.fromCharCode(49 + index)}
                    </div>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Rahul Bajaj`}
                      className="flex-1 px-3 py-3 rounded-[2px] font-normal placeholder:font-normal focus:outline-none focus:ring-0 bg-[#F2F2F2]"
                      required
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={correctAnswer === index}
                          onChange={() => setCorrectAnswer(index)}
                          className="w-4 h-4 text-[#8F64E1] focus:ring-[#8F64E1] focus:ring-2 border-gray-300"
                        />
                        <span className="ml-2 text-sm">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`not-correct-${index}`}
                          checked={correctAnswer !== index}
                          onChange={() => {}}
                          className="w-4 h-4 text-[#8F64E1] focus:ring-[#8F64E1] focus:ring-2 border-gray-300"
                        />
                        <span className="ml-2 text-sm">No</span>
                      </label>
                    </div>
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {options.length < 6 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="mt-5 ml-10 text-[#7C57C2] border p-2.5 rounded-[11px] border-[#7451B6] hover:text-[#7C57C2] text-sm font-medium"
                >
                  + Add More option
                </button>
              )}
            </div>
            <div className="py-4 fixed bottom-0 inset-x-0 w-full flex border-t justify-between items-center pr-10 pl-10 bg-white">
              {validationError && (
                <div className="text-red-600 text-sm font-medium">
                  {validationError}
                </div>
              )}
              <div className={validationError ? "" : "ml-auto"}>
                <ContinueButton
                  type="submit"
                  disabled={loading}
                  className="bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Creating Poll..." : "Ask Question"}
                </ContinueButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherCreatePoll;
