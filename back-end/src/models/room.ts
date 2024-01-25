import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    roomName: {
        type: String,
        required: true
    }
}, {versionKey: false});

export const Room = mongoose.model("Room", RoomSchema);