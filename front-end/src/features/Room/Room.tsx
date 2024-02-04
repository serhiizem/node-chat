import React, {KeyboardEvent, useEffect, useState} from "react";
import {IconButton, InputBase, Paper, styled, Toolbar} from "@mui/material";
import {Message} from "../../types/Message";
import {socket} from "../../api/socket";
import {useParams} from "react-router-dom";
import {PaperItem} from "../../components/PaperItem/PaperItem";
import * as roomsApi from "../../api/roomsApi";
import * as messagesApi from "../../api/messagesApi";

import SendIcon from '@mui/icons-material/Send';
import {ToolbarContainer} from "../../components/ToolbarContainer/ToolbarContainer";

const Offset = styled("div")(({theme}) => theme.mixins.toolbar);

export const Room: React.FC = () => {

    const {roomId} = useParams<string>();
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        roomsApi.getRoomMessages(roomId as string).then(res => setMessages(res.data));
        socket.on("message", res => setMessages(prevState => [...prevState, res]));
        socket.emit("join_room", roomId);

        return () => {
            socket.off("message");
        };
    }, [roomId]);

    const doDispatchMessage = async () => {
        await messagesApi.sendMessage({
            text: message,
            author: "stub",
            roomId: roomId as string
        });
        setMessage("");
    }

    const onMessageSend = async () => await doDispatchMessage();

    const onKeyDown = async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            await doDispatchMessage();
        }
    }

    return (
        <React.Fragment>
            {messages.map((message, idx) =>
                <PaperItem key={idx}>{message.text}</PaperItem>)}
            <Offset/>
            <ToolbarContainer
                open
                position="fixed"
                color="inherit"
                sx={{top: "auto", bottom: 0}}
            >
                <Toolbar>
                    <Paper
                        component="form"
                        sx={{p: "2px 4px", display: "flex", alignItems: "center", width: 400}}
                    >
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Type message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyDown={onKeyDown}
                            multiline
                        />
                        <IconButton type="button" sx={{p: "10px"}} disabled={!message} onClick={onMessageSend}>
                            <SendIcon/>
                        </IconButton>
                    </Paper>
                </Toolbar>
            </ToolbarContainer>
        </React.Fragment>
    );
}