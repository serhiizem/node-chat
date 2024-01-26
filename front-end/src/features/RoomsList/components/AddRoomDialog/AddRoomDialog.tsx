import React, {useContext} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {AddRoomDialogContext} from "../../../../contexts/AddRoomDialogContext";
import {extractFormDataAsJson} from "../../../../utils/formUtils";
import * as roomsApi from "../../../../api/roomsApi";

type MuiOnCloseReason = "backdropClick" | "escapeKeyDown";

export const AddRoomDialog: React.FC = () => {

    const {isOpen, closeDialog} = useContext(AddRoomDialogContext);

    const onClose = (event: object, reason: MuiOnCloseReason) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        closeDialog();
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formJson = extractFormDataAsJson(event);
        const roomName = formJson.roomName as string;

        roomsApi.createRoom({roomName}).finally(() => closeDialog());
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth={true}
            maxWidth="xs"
            PaperProps={{component: "form", onSubmit}}
        >
            <DialogTitle>Create Room</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter the name for a chat room</DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="room-name"
                    name="roomName"
                    label="Room name"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button type="submit">Create</Button>
            </DialogActions>
        </Dialog>
    );
}