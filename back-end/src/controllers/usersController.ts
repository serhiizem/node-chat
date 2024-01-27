import {Router} from "express";
import {Controller} from "./interfaces/controller.interface";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {appConfig} from "../utils/appConfig";
import {UserModel} from "../models/user.model";

export class UsersController implements Controller {

    public readonly path = "users";
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", this.loginUser.bind(this));
    }

    private async loginUser(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await UserModel.findOne({email});
            if (user === null) {
                return res.status(500).send({message: "User not found"});
            }
            const encryptedPassword = user.password as string;
            const hasMatchedHashes = await bcrypt.compare(password, encryptedPassword);
            if (hasMatchedHashes) {
                const token = this.createAuthToken(req, user);
                const response = {token: token, user: {_id: user._id, email: user.email}};

                res.json(response);
            } else {
                return res.status(500).send({message: "Wrong credentials"});
            }
        } catch (error) {
            next(error);
        }
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