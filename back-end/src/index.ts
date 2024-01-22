import express, {Express} from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import {router as messagesRouter} from "./routes/messages";
import {router as usersRouter} from "./routes/users";
import {listenToWebsocketConnection} from "./connections/socketConnection";
import {appConfig} from "./utils/appConfig";
import {connectDb} from "./connections/dbConnection";
import {logger} from "./utils/logger";
import {authStrategy} from "./auth/authStrategy";
import passport from "passport";

import * as websocket from "socket.io";
import * as http from "http";

const app: Express = express();
const httpServer: http.Server = require('http').createServer(app);
const websocketServer: websocket.Server = require('socket.io')(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

listenToWebsocketConnection(websocketServer);
app.set('websocketServer', websocketServer);

connectDb();

passport.use(authStrategy);
app.use(passport.initialize());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);

const applicationPort = appConfig.port;
httpServer.listen(applicationPort,
    () => logger.info(`Chat App is listening on port ${applicationPort}`));