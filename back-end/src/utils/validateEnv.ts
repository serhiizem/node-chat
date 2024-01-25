import {cleanEnv, port, str} from "envalid";

export const validateEnv = () => {
    cleanEnv(process.env, {
        APPLICATION_PORT: port(),
        DB_HOST: str(),
        DB_NAME: str(),
        AUTH_SECRET_KEY: str()
    });
};
