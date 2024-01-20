import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    text: {
        type: String
    }
}, {versionKey: false});

export const Message = mongoose.model('Message', MessageSchema);