import {appConfig} from "../utils/appConfig";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import passport from "passport";
import {UserModel} from "../models/user.model";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfig.authKey
}

const authStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await UserModel.findOne({username: jwtPayload.username});

        if (user) {
            return done(undefined, user, jwtPayload);
        } else {
            return done(undefined, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

passport.use(authStrategy);