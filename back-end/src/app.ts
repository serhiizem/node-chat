import express, {Express} from "express";
import http from "http";
import {connectDb} from "./connections/dbConnection";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import * as websocket from "socket.io";
import {listenToWebsocketConnection} from "./connections/socketConnection";
import {appConfig} from "./utils/appConfig";
import {logger} from "./utils/logger";
import {Controller} from "./controllers/interfaces/controller.interface";

export class App {

    private readonly app: Express;
    private readonly httpServer: http.Server;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.httpServer = http.createServer(this.app);

        connectDb();

        this.configureAuth();
        this.configureApi();
        this.configureWebsocket();
        this.configureControllers(controllers);
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

    private configureControllers(controllers: Controller[]) {
        controllers.forEach((controller: Controller) => {
            this.app.use('/api', controller.router);
        });
    }

    public start(): void {
        const applicationPort = appConfig.port;
        this.httpServer.listen(applicationPort,
            () => logger.info(`Chat App is listening on port ${applicationPort}`));
    }
}