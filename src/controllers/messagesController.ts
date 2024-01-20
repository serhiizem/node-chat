import {logger} from "../utils/logger";

export const createMessage = (req, res, next) => {
    saveMessage(req, res);
    emitMessage(req, res)
};

const saveMessage = (req, res) => {
    logger.info(`Received message: ${req.body?.message}`)
    // TODO: save message
};

const emitMessage = (req, res) => {
    const server = req.app.get('websocketServer');
    const message = req.body?.message;

    server.emit('message', message);
    res.json(message)
};