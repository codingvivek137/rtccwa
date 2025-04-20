import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };

  const serverUrl =
    import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const socket = io(serverUrl, options);

  // Add event listeners for connection events
  socket.on("connect", () => {
    console.log("Socket connected successfully! Socket ID:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};
