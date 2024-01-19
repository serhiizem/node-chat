import {Router} from "express";
import {createMessage} from "../controllers/messagesController"

const router: Router = Router();

export const createMessageRoute = router.post('/', createMessage);
