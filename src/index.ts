import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import {createMessageRoute} from "./routes/messages";
import {listenToWebsocketConnection} from "./connections/socketConnection";

const app = express();
const server = require('http').createServer(app);
const websocketServer = require('socket.io')(server);

listenToWebsocketConnection(websocketServer);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/messages', createMessageRoute);

const applicationPort = 8082;
app.listen(applicationPort,
    () => console.log(`Chat App is listening on port ${applicationPort}`));