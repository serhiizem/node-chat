import {Router} from "express";
import {loginUser} from "../controllers/usersController";

export class UsersRoutes {

    readonly router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post('/login', loginUser);
    }
}
