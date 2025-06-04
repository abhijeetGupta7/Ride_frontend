import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_BASE_URL}`);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("connected to server");
    });

    newSocket.on("disconnect", () => {
      console.log("disconnected from server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  );
};