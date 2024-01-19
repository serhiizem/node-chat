const logger = require("../utils/logger");

exports.messageCreate = (req, res, next) => {
    saveMessage(req);
};

const saveMessage = (req) => {
    logger.info(`req: ${req.body?.message}`)
    // TODO: save message
};