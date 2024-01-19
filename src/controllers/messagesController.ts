import {logger} from "../utils/logger";

export const createMessage = (req, res, next) => {
    saveMessage(req);
};

const saveMessage = (req) => {
    logger.info(`req: ${req.body?.message}`)
    // TODO: save message
};