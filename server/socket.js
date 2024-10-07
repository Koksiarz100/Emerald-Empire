const { Server } = require("socket.io");

let connectedClients = [];

const configureSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.query.token;
    console.log("Authenticating socket with token:", token);

    if (!token) {
      console.log("No token provided, disconnecting socket.");
      return next(new Error("Authentication error"));
    }

    if (token !== "123") {
      console.log("Invalid token, disconnecting socket.");
      return next(new Error("Authentication error"));
    }

    next();
  });

  io.on("connection", (socket) => {
    const clientId = socket.handshake.query.clientId;
    console.log("Client connected with ID:", clientId);

    if (!clientId) {
      console.log("No clientId provided, disconnecting socket.");
      socket.disconnect();
      return;
    }

    if (connectedClients.includes(clientId)) {
      console.log("Client already connected!");
      socket.disconnect();
      return;
    }

    socket.on("message", (message, callback) => {
      console.log("Message received: ", message);
      callback("got it");
    });

    connectedClients.push(clientId);
    console.log("A user connected!");

    socket.on("disconnect", (reason) => {
      console.log("User disconnected:", reason);
      connectedClients = connectedClients.filter(id => id !== clientId);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  io.on("error", (error) => {
    console.error("Server error:", error);
  });
};

module.exports = { configureSocket };