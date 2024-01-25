import {Router} from "express";
import {createRoom, listRooms} from "../controllers/roomsController";

export class RoomsRoutes {

    readonly router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get("/", listRooms);
        this.router.post("/", createRoom);
    }
}