import * as rootPath from "app-root-path";

process.env["NODE_CONFIG_DIR"] = `${rootPath}/src/config`;

const config = require("config");

export const appConfig = {
    port: process.env.APPLICATION_PORT,
    mongoHost: process.env.DB_HOST,
    mongoDbName: process.env.DB_NAME,
    authKey: process.env.AUTH_SECRET_KEY,
    saltRounds: config.get("passwordSettings.saltRounds")
}