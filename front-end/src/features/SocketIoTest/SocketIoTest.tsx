import React, {useEffect, useState} from "react";
import {socket} from "../../api/socket";
import {Box, Button, TextField, Typography} from "@mui/material";
import * as messagesApi from "../../api/messagesApi";

export const SocketIoTest = () => {

    const [message, setMessage] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.on("message", message => setChatMessages(prevState => [...prevState, message]));
        return () => {
            socket.off("message").off();
        }
    }, []);

    const onMessageSend = () => {
        messagesApi.sendMessage({
            text: message,
            author: "test",
            roomId: 1
        }).then(_ => setMessage(""));
    };

    return (
        <Box sx={{
            padding: "20rem"
        }}>
            <TextField label="Message"
                       variant="outlined"
                       value={message}
                       onChange={e => setMessage(e.target.value)}
            />
            <Button onClick={onMessageSend}>Send</Button>

            {chatMessages.map((m, idx) => <Typography key={idx}>{m}</Typography>)}
        </Box>
    );
}