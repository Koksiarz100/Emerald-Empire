const { Server } = require("socket.io");

let connectedClients = [];

function configureSocket() { // Socket.io configuration
  const io = new Server(4000, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
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

    socket.on("disconnect", () => {
      console.log("user disconnected");
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