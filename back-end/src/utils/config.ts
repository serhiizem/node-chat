import * as rootPath from "app-root-path";

process.env["NODE_CONFIG_DIR"] = `${rootPath}/src/config`;

const config = require('src/utils/config');

export const appConfig = {
    port: config.get("port")
}