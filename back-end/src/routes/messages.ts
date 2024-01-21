import {Router} from "express";
import {createMessage} from "../controllers/messagesController"

export const router: Router = Router();

router.post('/', createMessage);
