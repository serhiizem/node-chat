import express, {Express} from "express";
import http from "http";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import * as websocket from "socket.io";
import {appConfig} from "./utils/appConfig";
import {logger} from "./utils/logger";
import {Controller} from "./controllers/interfaces/controller.interface";
import {WebSocketConnection} from "./connections/socketConnection";

export class App {

    private readonly app: Express;
    private readonly httpServer: http.Server;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.configureAuth();
        this.configureApi();
        this.configureWebsocket();
        this.configureRoutes(controllers);
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
                origin: appConfig.corsOrigin,
                methods: ["GET", "POST"]
            }
        });

        new WebSocketConnection(websocketServer);
        this.app.set("websocketServer", websocketServer);
    }

    private configureRoutes(controllers: Controller[]) {
        controllers.forEach((controller: Controller) => {
            this.app.use(`/api/${controller.path}`, controller.router);
        });
    }

    public start(): void {
        const applicationPort = appConfig.port;
        this.httpServer.listen(applicationPort,
            () => logger.info(`Chat App is listening on port ${applicationPort}`));
    }
}