import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppNavigation } from "../hooks/useAppNavigation";

// Components
import Welcome from "../components/Welcome";
import StudentNameEntry from "../components/StudentNameEntry";
import TeacherCreatePoll from "../components/TeacherCreatePoll";
import StudentPollAnswer from "../components/StudentPollAnswer";
import PollResults from "../components/PollResults";
import PollHistory from "../components/PollHistory";
import KickedOut from "../components/KickedOut";
import WaitingForTeacher from "./WaitingForTeacher";

const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  const { currentPoll } = useSelector((state) => state.poll);
  const navigation = useAppNavigation();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={<Welcome onContinue={navigation.handleRoleSelection} />} 
      />
      <Route 
        path="/welcome" 
        element={<Welcome onContinue={navigation.handleRoleSelection} />} 
      />
      
      {/* Student Routes */}
      <Route 
        path="/student/name-entry" 
        element={<StudentNameEntry onNameSubmit={navigation.handleNameSubmit} />} 
      />
      <Route 
        path="/student/answer-poll" 
        element={
          user.role === "student" ? (
            <StudentPollAnswer 
              poll={currentPoll} 
              onAnswerSubmitted={navigation.handleAnswerSubmitted}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route path="/student/waiting" element={<WaitingForTeacher />} />
      <Route path="/student/kicked" element={<KickedOut />} />
      
      {/* Teacher Routes */}
      <Route 
        path="/teacher/dashboard" 
        element={
          user.role === "teacher" ? (
            <TeacherCreatePoll onPollCreated={navigation.handlePollCreated} />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      
      {/* Shared Routes */}
      <Route 
        path="/results" 
        element={
          <PollResults 
            poll={currentPoll}
            onNewQuestion={
              user.role === "teacher" ? navigation.handleNewQuestion : undefined
            }
            onViewHistory={
              user.role === "teacher" ? navigation.handleViewHistory : undefined
            }
            showNewQuestionButton={user.role === "teacher"}
          />
        } 
      />
      <Route 
        path="/history" 
        element={
          user.role === "teacher" ? (
            <PollHistory onBackToLive={navigation.handleBackToLive} />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
