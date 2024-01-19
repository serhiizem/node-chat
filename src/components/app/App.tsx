import React, {useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import { sendMessage } from "../../api/messagesApi"

export const App = () => {

    const [message, setMessage] = useState("");

    return (
        <Box sx={{
            padding: "20rem"
        }}>
            <TextField label="Message" variant="outlined" onChange={e => setMessage(e.target.value)} />
            <Button onClick={() => sendMessage(message).then(_ => setMessage(""))}>
                Send
            </Button>
        </Box>
    );
}
