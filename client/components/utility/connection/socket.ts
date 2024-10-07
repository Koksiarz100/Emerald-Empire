import { io } from "socket.io-client";

const socket = io('ws://localhost:4000', {
  query: {
    clientId: '1',
    token: '123'
  }
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

socket.on("connect", () => {
  console.log("Connected to server.");
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected from server:", reason);
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});

export function sendSocketMessage(message: string) {
  console.log("Sending message to server...");

  try {
    socket.emit("message", message, (response: string) => {
      console.log("Server response:", response);
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

console.log("Socket initialized with clientId:", socket.io.opts.query?.clientId);
console.log("Socket initialized with token:", socket.io.opts.query?.token);