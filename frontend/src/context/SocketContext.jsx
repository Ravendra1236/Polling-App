import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL ||
      "https://polling-app-avmq.onrender.com";
    const newSocket = io(backendUrl, {
      extraHeaders: {
        "ngrok-skip-browser-warning": "true",
      },
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
