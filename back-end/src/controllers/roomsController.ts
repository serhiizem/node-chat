import {Router} from "express";
import {Controller} from "./interfaces/controller.interface";
import mongoose from "mongoose";
import {RoomModel} from "../models/room.model";

export class RoomsController implements Controller {

    public readonly path = "/rooms";
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", this.listRooms);
        this.router.post("/", this.createRoom);
    }

    private listRooms(req, res, next) {
        RoomModel.find({})
            .then(list => {
                res.json(list);
            })
            .catch(err => {
                next(err);
            })
    }

    private createRoom(req, res, next) {
        RoomModel.create({
            _id: new mongoose.Types.ObjectId(),
            roomName: req.body.roomName
        })
            .then(room => {
                const server = req.app.get("websocketServer");
                server.emit("new_room", room);
                res.json(room);
            })
            .catch(err => {
                next(err);
            })
    };
}
