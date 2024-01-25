import {Router} from "express";
import {Controller} from "./interfaces/controller.interface";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {appConfig} from "../utils/appConfig";
import {UserModel} from "../models/user.model";

export class UsersController implements Controller {

    public readonly path = '/users';
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", this.loginUser);
    }

    private loginUser(req, res, next) {
        const {email, password} = req.body;
        UserModel.findOne({email})
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
                        const token = this.createAuthToken(req, user);
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

    private createAuthToken(req, user) {
        const payload = {id: user._id};
        const secretKey = appConfig.authKey as string;

        if (req.body.rememberMe) {
            return jwt.sign(payload, secretKey);
        } else {
            return jwt.sign(payload, secretKey, {expiresIn: 15 * 60});
        }
    };
}