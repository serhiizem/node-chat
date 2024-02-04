import React, {useContext} from "react";
import {Box, List, Typography} from "@mui/material";
import {EnhancedListItemButton} from "../../components/EnhancedListItemButton/EnhancedListItemButton";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MessageIcon from '@mui/icons-material/Message';
import {AddRoomDialogContext} from "../../contexts/AddRoomDialogContext";
import {AddRoomDialog} from "./components/AddRoomDialog/AddRoomDialog";
import {Room} from "../../types/Room";
import {useNavigate, useParams} from "react-router-dom";

type RoomsListProps = {
    rooms: Room[]
};

export const RoomsList: React.FC<RoomsListProps> = ({rooms}) => {

    const {roomId} = useParams();
    const navigate = useNavigate();
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
                    <Box sx={{pl: 4}}>
                        {rooms.length === 0
                            ? <Typography>No rooms yet</Typography>
                            : rooms.map((room: Room) =>
                                <EnhancedListItemButton
                                    key={room.roomName}
                                    title={room.roomName}
                                    isSelected={roomId === room._id}
                                    icon={<MessageIcon/>}
                                    onClick={() => navigate(`/chat/room/${room._id}`)}
                                />
                            )
                        }
                    </Box>
                </List>
            </List>
            <AddRoomDialog/>
        </React.Fragment>
    );
}