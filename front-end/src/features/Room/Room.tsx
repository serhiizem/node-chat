import React, {useEffect, useState} from "react";
import {IconButton, InputBase, Paper, Typography} from "@mui/material";
import {Message} from "../../types/Message";
import {socket} from "../../api/socket";
import * as roomsApi from "../../api/roomsApi";

import SendIcon from '@mui/icons-material/Send';

export const Room: React.FC = () => {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        roomsApi.getRoomMessages("1")
            .then(res => setMessages(res.data));
        socket.on("message", res => setMessages(prevState => [...prevState, res]));
        return () => {
            socket.off("message");
        };
    }, []);

    return (
        <React.Fragment>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
            >
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Type message"
                />
                <IconButton type="button" sx={{p: '10px'}}>
                    <SendIcon/>
                </IconButton>
            </Paper>
            {messages.map((message, idx) =>
                <Typography key={idx}>{message.text}</Typography>)}
        </React.Fragment>
    );
}