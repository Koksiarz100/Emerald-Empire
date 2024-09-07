const { Server } = require("socket.io");

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
    console.log("A user connected!");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

module.exports = { configureSocket };