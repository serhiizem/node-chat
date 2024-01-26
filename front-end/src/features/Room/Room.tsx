import React, {useEffect, useState} from "react";
import {IconButton, InputBase, Paper} from "@mui/material";
import {Message} from "../../types/Message";
import {socket} from "../../api/socket";
import {useParams} from "react-router-dom";
import {PaperItem} from "../../components/PaperItem/PaperItem";
import * as roomsApi from "../../api/roomsApi";
import * as messagesApi from "../../api/messagesApi";

import SendIcon from '@mui/icons-material/Send';

export const Room: React.FC = () => {

    const {roomId} = useParams<string>();
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        roomsApi.getRoomMessages(roomId as string).then(res => setMessages(res.data));
        socket.on("message", res => setMessages(prevState => [res, ...prevState]));
        socket.emit("join_room", roomId);

        return () => {
            socket.off("message");
        };
    }, [roomId]);

    const onMessageSend = async () => {
        await messagesApi.sendMessage({
            text: message,
            author: "stub",
            roomId: roomId as string
        });
        setMessage("");
    };

    return (
        <React.Fragment>
            <Paper
                component="form"
                sx={{p: "2px 4px", display: "flex", alignItems: "center", width: 400}}
            >
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Type message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <IconButton type="button" sx={{p: "10px"}} onClick={onMessageSend}>
                    <SendIcon/>
                </IconButton>
            </Paper>
            {messages.map((message, idx) =>
                <PaperItem key={idx}>{message.text}</PaperItem>)}
        </React.Fragment>
    );
}