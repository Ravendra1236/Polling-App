import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { currentPoll } = useSelector((state) => state.poll);

  const handleRoleSelection = (role) => {
    if (role === "student") {
      navigate("/student/name-entry");
    } else {
      navigate("/teacher/dashboard");
    }
  };

  const handleNameSubmit = () => {
    if (currentPoll && currentPoll.isActive) {
      // Check if student already answered
      const hasAnswered = currentPoll.responses?.some(
        (response) => response.studentName === user.name
      );

      if (hasAnswered) {
        navigate("/results");
      } else {
        navigate("/student/answer-poll");
      }
    } else {
      navigate("/student/waiting");
    }
  };

  const handlePollCreated = () => {
    navigate("/results");
  };

  const handleAnswerSubmitted = () => {
    navigate("/results");
  };

  const handleNewQuestion = () => {
    navigate("/teacher/dashboard");
  };

  const handleViewHistory = () => {
    navigate("/history");
  };

  const handleBackToLive = () => {
    navigate("/results");
  };

  const handleStudentKicked = () => {
    navigate("/student/kicked");
  };

  const handlePollCreatedForStudent = () => {
    if (user.role === "student") {
      navigate("/student/answer-poll");
    }
  };

  const handlePollClosed = () => {
    if (user.role === "student") {
      navigate("/student/waiting");
    } else if (user.role === "teacher") {
      navigate("/results");
    }
  };

  return {
    handleRoleSelection,
    handleNameSubmit,
    handlePollCreated,
    handleAnswerSubmitted,
    handleNewQuestion,
    handleViewHistory,
    handleBackToLive,
    handleStudentKicked,
    handlePollCreatedForStudent,
    handlePollClosed,
  };
};
