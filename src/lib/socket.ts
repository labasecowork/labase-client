import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "ws://localhost:3000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});
