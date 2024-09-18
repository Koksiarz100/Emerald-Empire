import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  reconnectionDelayMax: 10000,
  auth: {
    token: "123"
  },
  query: {
    "my-key": "my-value"
  }
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