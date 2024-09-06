const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const { configureSocket } = require('./socket');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

routes(app);
configureSocket();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});