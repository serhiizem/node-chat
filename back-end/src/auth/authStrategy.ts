import {appConfig} from "../utils/appConfig";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import {User} from "../models/user";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfig.authKey
}

export const authStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    User.findOne({username: jwtPayload.username}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(undefined, user, jwtPayload);
        } else {
            return done(undefined, false);
        }
    });
})