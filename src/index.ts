import express from 'express';
import bodyParser from "body-parser";

const cors = require("cors");
const messages = require('./routes/messages');

const app = express();
const server = require('http').createServer(app);
const websocketServer = require('socket.io')(server);

require('./connections/socketConnection')(websocketServer);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/messages', messages);

const applicationPort = 8082;
app.listen(applicationPort,
    () => console.log(`Chat App is listening on port ${applicationPort}`));