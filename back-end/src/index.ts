import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import {createMessageRoute} from "./routes/messages";
import {listenToWebsocketConnection} from "./connections/socketConnection";
import {appConfig} from "./utils/config";

const app = express();
const server = require('http').createServer(app);
const websocketServer = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

listenToWebsocketConnection(websocketServer);
app.set('websocketServer', websocketServer);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/messages', createMessageRoute);

const applicationPort = appConfig.port;
server.listen(applicationPort,
    () => console.log(`Chat App is listening on port ${applicationPort}`));