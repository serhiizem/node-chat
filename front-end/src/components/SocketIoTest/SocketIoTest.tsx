import React, {useEffect, useState} from "react";
import {socket} from "../../api/socket";
import {Box, Button, TextField, Typography} from "@mui/material";
import {sendMessage} from "../../api/messagesApi";

export const SocketIoTest = () => {

    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.on("message", message => setChatMessages(prevState => [...prevState, message]));
        return () => {
            socket.off("message").off();
        }
    }, []);

    return (
        <Box sx={{
            padding: "20rem"
        }}>
            <TextField label="Message"
                       variant="outlined"
                       value={message}
                       onChange={e => setMessage(e.target.value)}
            />
            <Button onClick={() => sendMessage(message).then(_ => setMessage(""))}>
                Send
            </Button>

            {chatMessages.map((m, idx) => <Typography key={idx}>{m}</Typography>)}
        </Box>
    );
}