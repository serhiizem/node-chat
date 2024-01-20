import {logger} from "../utils/logger";
import {Message} from "../models/message";
import mongoose from "mongoose";

export const createMessage = (req, res) => {
    const {body: {message}} = req;
    logger.info(`Received message: ${message}`)

    saveMessage(message).then(() => emitMessage(req, res));
};

const saveMessage = (message: string) => {
    return Message.create({
        _id: new mongoose.Types.ObjectId(),
        text: message
    })
};

const emitMessage = (req, res) => {
    const server = req.app.get('websocketServer');
    const message = req.body?.message;

    server.emit('message', message);
    res.json(message)
};