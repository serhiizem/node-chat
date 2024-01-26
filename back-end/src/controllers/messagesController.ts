import {Router} from "express";
import {Controller} from "./interfaces/controller.interface";
import mongoose from "mongoose";
import {MessageModel} from "../models/message.model";
import {logger} from "../utils/logger";
import {Message} from "../domain/Message";

export class MessagesController implements Controller {

    public readonly path = "messages";
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", this.createMessage.bind(this));
    }

    private async createMessage(req, res) {
        const message: Message = req.body;
        logger.info(`Received message: ${message.text}`);

        await this.saveMessage(message);
        await this.emitMessage(req, res);
    };

    private async saveMessage(message: Message) {
        await MessageModel.create({
            _id: new mongoose.Types.ObjectId(),
            text: message.text
        });
    };

    private async emitMessage(req, res) {
        const server = req.app.get("websocketServer");
        const message = req.body?.message;

        server.emit("message", message);
        res.json(message);
    };
}
