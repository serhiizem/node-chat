import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    text: {
        type: String
    },
    roomId: {
        type: Schema.Types.ObjectId, ref: "Room", autopopulate: true
    },
}, {versionKey: false});

export const MessageModel = mongoose.model("Message", MessageSchema);