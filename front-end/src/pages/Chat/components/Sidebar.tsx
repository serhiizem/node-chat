import React, {useEffect, useState} from "react";
import {Divider, Drawer, IconButton} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {AddRoomDialogContextProvider} from "../../../contexts/AddRoomDialogContext";
import {RoomsList} from "../../../features/RoomsList/RoomsList";
import {HeaderContainer} from "../../../components/HeaderContainer/HeaderContainer";
import * as roomsApi from "../../../api/roomsApi";
import {Room} from "../../../types/Room";
import {socket} from "../../../api/socket";

export const sidebarWidth = 400;

type SidebarProps = {
    open: boolean;
    handleDrawerClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({open, handleDrawerClose}) => {

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        roomsApi.getRooms().then(response => setRooms(response.data));
        socket.on("new_room", room => setRooms(prevState => [...prevState, room]));
        return () => {
            socket.off("new_room");
        }
    }, []);

    return (
        <Drawer
            sx={{
                width: sidebarWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: sidebarWidth,
                    boxSizing: 'border-box'
                }
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <HeaderContainer>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </HeaderContainer>
            <Divider/>
            <AddRoomDialogContextProvider>
                <RoomsList rooms={rooms}/>
            </AddRoomDialogContextProvider>
        </Drawer>
    );
}