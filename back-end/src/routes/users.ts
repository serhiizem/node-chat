import {Router} from "express";
import {loginUser} from "../controllers/usersController";

export const router: Router = Router();

router.post('/login', loginUser);