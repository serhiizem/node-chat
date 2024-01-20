import * as rootPath from "app-root-path";

process.env["NODE_CONFIG_DIR"] = `${rootPath}/src/config`;

const config = require('config');

export const appConfig = {
    port: config.get("port"),
    mongoHost: config.get('mongoDbConfig.host'),
    mongoDbName: config.get('mongoDbConfig.dbName')
}