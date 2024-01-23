import {User} from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {appConfig} from "../utils/appConfig";

export const loginUser = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email})
        .then((user) => {
            if (user === null) {
                return res.status(500).send({message: "User not found"});
            }
            const encryptedPassword = user.password as string;
            bcrypt.compare(password, encryptedPassword, (error, result) => {
                if (error) {
                    return next(error)
                }

                if (result) {
                    const token = createAuthToken(req, user);
                    const response = {token: token, user: {_id: user._id, email: user.email}};

                    res.json(response)
                } else {
                    return res.status(500).send({message: "Wrong credentials"});
                }
            })
        })
        .catch((err) => {
            next(err)
        })
};

const createAuthToken = (req, user) => {
    const payload = {id: user._id};
    const secretKey = appConfig.authKey;

    if (req.body.rememberMe) {
        return jwt.sign(payload, secretKey);
    } else {
        return jwt.sign(payload, secretKey, {expiresIn: 15 * 60});
    }
};