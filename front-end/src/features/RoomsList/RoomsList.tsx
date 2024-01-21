import React, {useContext} from "react";
import {Box, List} from "@mui/material";
import {EnhancedListItemButton} from "../../components/EnhancedListItemButton/EnhancedListItemButton";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MessageIcon from '@mui/icons-material/Message';
import {AddRoomDialogContext} from "../../contexts/AddRoomDialogContext";
import {AddRoomDialog} from "./components/AddRoomDialog/AddRoomDialog";

const sampleRooms = [
    {
        roomName: "Sindragossa 25HC"
    }
]

export const RoomsList: React.FC = () => {

    const {openDialog} = useContext(AddRoomDialogContext);

    return (
        <React.Fragment>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper'
                }}
                component="nav"
            >
                <EnhancedListItemButton
                    title="Create room"
                    icon={<AddCircleIcon/>}
                    onClick={openDialog}
                />
                <EnhancedListItemButton title="Rooms" icon={<InboxIcon/>}/>

                <List component="div" disablePadding>
                    {sampleRooms.map(room =>
                        <Box key={room.roomName} sx={{pl: 4}}>
                            <EnhancedListItemButton title={room.roomName} icon={<MessageIcon/>}/>
                        </Box>
                    )}
                </List>
            </List>
            <AddRoomDialog/>
        </React.Fragment>
    );
}