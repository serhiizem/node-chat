import {Router} from "express";
import {createMessage} from "../controllers/messagesController"

export class MessagesRoutes {

    readonly router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post('/', createMessage);
    }
}
