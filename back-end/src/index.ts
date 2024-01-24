import express, {Express} from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import {MessagesRoutes} from "./routes/messages";
import {UsersRoutes} from "./routes/users";
import {listenToWebsocketConnection} from "./connections/socketConnection";
import {appConfig} from "./utils/appConfig";
import {connectDb} from "./connections/dbConnection";
import {logger} from "./utils/logger";
import passport from "passport";
import "./auth/authStrategy";

import * as websocket from "socket.io";
import * as http from "http";

class Server {

    private readonly app: Express;
    private readonly httpServer: http.Server;

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);

        connectDb();

        this.configureAuth();
        this.configureApi();
        this.configureWebsocket();
        this.configureRoutes();
    }

    private configureAuth() {
        this.app.use(passport.initialize());
    }

    private configureApi() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    private configureWebsocket() {
        const websocketServer: websocket.Server = new websocket.Server(this.httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });

        listenToWebsocketConnection(websocketServer);
        this.app.set('websocketServer', websocketServer);
    }

    private configureRoutes() {
        this.app.use('/api/messages', new MessagesRoutes().router);
        this.app.use('/api/users', new UsersRoutes().router);
    }

    public start(): void {
        const applicationPort = appConfig.port;
        this.httpServer.listen(applicationPort,
            () => logger.info(`Chat App is listening on port ${applicationPort}`));
    }
}

const server: Server = new Server();
server.start();