import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {appConfig} from "../utils/appConfig";
import {User} from "../domain/User";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {versionKey: false});

UserSchema.pre("save", function (next) {
    const user = this;

    bcrypt.hash(user.password, appConfig.saltRounds, function (error, hash) {
        if (error) {
            return next(error);
        }
        user.password = hash;
        next();
    })
});

export const UserModel = mongoose.model("User", UserSchema);