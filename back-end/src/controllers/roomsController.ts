import mongoose from "mongoose";
import {Room} from "../models/room";

export const listRooms = (req, res, next) => {
    Room.find({})
        .then(list => {
            res.json(list);
        })
        .catch(err => {
            next(err);
        })
}

export const createRoom = (req, res, next) => {
    Room.create({
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