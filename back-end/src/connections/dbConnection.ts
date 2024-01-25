import mongoose from "mongoose";
import {appConfig} from "../utils/appConfig";
import {logger} from "../utils/logger";

const {mongoUser, mongoPassword, mongoHost, mongoDbName} = appConfig;
const mongoDbUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoDbName}`;

export const connectDb = () => {

    mongoose.connect(mongoDbUrl).catch(err => {
        logger.error(err.message);
        process.exit(1);
    });

    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
        logger.info("Database connected");
    });

    dbConnection.on("error", (err) => {
        logger.error(`connection error: ${err}`);
    });
}


