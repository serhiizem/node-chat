import {logger} from "../utils/logger";
import {Message} from "../models/message";
import mongoose from "mongoose";
import {Controller} from "./interfaces/controller.interface";
import {Router} from "express";

export class MessagesController implements Controller {

    public readonly path = '/messages';
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", this.createMessage);
    }

    private createMessage(req, res) {
        const {body: {message}} = req;
        logger.info(`Received message: ${message}`)

        this.saveMessage(message).then(() => this.emitMessage(req, res));
    };

    private saveMessage(message: string) {
        return Message.create({
            _id: new mongoose.Types.ObjectId(),
            text: message
        })
    };

    private emitMessage(req, res) {
        const server = req.app.get('websocketServer');
        const message = req.body?.message;

        server.emit('message', message);
        res.json(message)
    };
}
