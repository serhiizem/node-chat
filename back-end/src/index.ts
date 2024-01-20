import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import {createMessageRoute} from "./routes/messages";
import {listenToWebsocketConnection} from "./connections/socketConnection";
import {appConfig} from "./utils/appConfig";
import {connectDb} from "./connections/dbConnection";
import {logger} from "./utils/logger";

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

connectDb();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/messages', createMessageRoute);

const applicationPort = appConfig.port;
server.listen(applicationPort,
    () => logger.info(`Chat App is listening on port ${applicationPort}`));