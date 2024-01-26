import {Router} from "express";
import {Controller} from "./interfaces/controller.interface";
import mongoose from "mongoose";
import {RoomModel} from "../models/room.model";
import {MessageModel} from "../models/message.model";

export class RoomsController implements Controller {

    public readonly path = "rooms";
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", this.listRooms.bind(this));
        this.router.post("/", this.createRoom.bind(this));
        this.router.get("/:roomId/messages", this.getRoomMessages.bind(this));
    }

    private async listRooms(req, res, next) {
        try {
            const rooms = await RoomModel.find({});
            res.json(rooms);
        } catch (error) {
            next(error);
        }
    }

    private async createRoom(req, res, next) {
        try {
            const room = await RoomModel.create({
                _id: new mongoose.Types.ObjectId(),
                roomName: req.body.roomName
            });
            const server = req.app.get("websocketServer");
            server.emit("new_room", room);
            res.json(room);
        } catch (error) {
            next(error);
        }
    };

    private async getRoomMessages(req, res, next) {
        try {
            const {roomId} = req.params;
            const roomMessages = await MessageModel.find({roomId});
            res.json(roomMessages);
        } catch (error) {
            next(error);
        }
    }
}
