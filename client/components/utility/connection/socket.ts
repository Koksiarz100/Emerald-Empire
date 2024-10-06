import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  query: {
    clientId: "1"
  },
  auth: {
    token: "123"
  }
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

socket.on("connect", () => {
  console.log("Connected to server.");
});

export function sendSocketMessage(message: string) {
  console.log("Sending message to server...");

  socket.emit("message", message, (response: string) => {
    console.log(response);
  });
}