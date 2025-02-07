const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require("socket.io");

const routes = require('./routes/routes');
const { configureSocket } = require('./connection/socket');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

const io = new Server(4000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
});

configureSocket(io);

routes(app);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});