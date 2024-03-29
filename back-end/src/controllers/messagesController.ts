import {Router} from "express";
import {Server} from "socket.io";
import {Controller} from "./interfaces/controller.interface";
import mongoose from "mongoose";
import {MessageModel} from "../models/message.model";
import {logger} from "../utils/logger";
import {Message} from "../types/Message";
import {messagesCounter} from "../utils/metricsClient";

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
        messagesCounter.inc();

        await this.saveMessage(message);
        await this.emitMessage(req, res);
    };

    private async saveMessage(message: Message) {
        await MessageModel.create({
            _id: new mongoose.Types.ObjectId(),
            text: message.text,
            roomId: message.roomId
        });
    };

    private async emitMessage(req, res) {
        const server: Server = req.app.get("websocketServer");
        const message: Message = req.body;

        server.to(message.roomId).emit("message", message);
        res.json(message);
    };
}
