import * as rootPath from "app-root-path";

process.env["NODE_CONFIG_DIR"] = `${rootPath}/src/config`;

const config = require("config");

export const appConfig = {
    port: process.env.APPLICATION_PORT,
    mongoHost: process.env.DB_HOST,
    mongoDbName: process.env.DB_NAME,
    mongoUser: process.env.DB_USER,
    mongoPassword: process.env.DB_PASSWORD,
    authKey: process.env.AUTH_SECRET_KEY,
    corsOrigin: config.get("corsConfiguration.origin"),
    saltRounds: config.get("passwordSettings.saltRounds")
};
