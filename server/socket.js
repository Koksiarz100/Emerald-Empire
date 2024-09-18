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
    const clientAddress = socket.handshake.address;

    if (connectedClients.includes(clientAddress)) {
      console.log("Client already connected!");
      socket.disconnect();
      return;
    }

    connectedClients.push(clientAddress);
    console.log("A user connected!");

    socket.on("message", (message, callback) => {
      console.log("Message received: ", message);
      callback("got it");
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      connectedClients = connectedClients.filter(address => address !== clientAddress);
    });
  });
};

module.exports = { configureSocket };