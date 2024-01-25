import {appConfig} from "../utils/appConfig";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import passport from "passport";
import {UserModel} from "../models/user.model";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfig.authKey
}

const authStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    UserModel.findOne({username: jwtPayload.username}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(undefined, user, jwtPayload);
        } else {
            return done(undefined, false);
        }
    });
});

passport.use(authStrategy);