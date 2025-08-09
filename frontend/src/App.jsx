import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCurrentPoll, updatePoll } from "./store/pollSlice";
import { useSocket } from "./hooks/useSocket";
import { useAppNavigation } from "./hooks/useAppNavigation";

// Routes
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const socket = useSocket();
  const navigation = useAppNavigation();

  useEffect(() => {
    // Get current poll on app load
    dispatch(getCurrentPoll());
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      // Listen for new polls
      socket.on("poll-created", (pollData) => {
        dispatch(updatePoll(pollData));
        if (
          user.role === "student" &&
          location.pathname !== "/" &&
          location.pathname !== "/welcome" &&
          location.pathname !== "/student/name-entry"
        ) {
          navigation.handlePollCreatedForStudent();
        }
      });

      // Listen for poll results updates
      socket.on("results-updated", (pollData) => {
        dispatch(updatePoll(pollData));
      });

      // Listen for poll closure
      socket.on("poll-closed", () => {
        dispatch(updatePoll(null)); // Clear the current poll
        navigation.handlePollClosed();
      });

      // Listen for student being kicked out
      socket.on("student-kicked", (data) => {
        if (user.role === "student" && data.studentName === user.name) {
          navigation.handleStudentKicked();
        }
      });

      return () => {
        socket.off("poll-created");
        socket.off("results-updated");
        socket.off("poll-closed");
        socket.off("student-kicked");
      };
    }
  }, [socket, dispatch, user.role, user.name, location.pathname, navigation]);

  return <div className="min-h-screen h-full w-full">
    <AppRoutes />;
  </div>
}

export default App;
