import { io } from "socket.io-client";

const socket = io("http://192.168.200.1", {
  path: "/socket.io",
  transports: ["websocket"],
});

socket.on("connect", () => console.log("✅ Connected"));
socket.on("connect_error", (err) => console.error("❌ Connect error:", err));

