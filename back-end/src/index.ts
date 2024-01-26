import "dotenv/config"
import {App} from "./app";
import {UsersController} from "./controllers/usersController";
import {RoomsController} from "./controllers/roomsController";
import {MessagesController} from "./controllers/messagesController";
import {validateEnv} from "./utils/validateEnv";
import "./connections/dbConnection";

validateEnv();

const app: App = new App(
    [
        new UsersController(),
        new RoomsController(),
        new MessagesController()
    ]
);

app.start();