import React from "react";
import {Divider, Drawer, IconButton, styled} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {AddRoomDialogContextProvider} from "../../../contexts/AddRoomDialogContext";
import {RoomsList} from "../../../features/RoomsList/RoomsList";

export const sidebarWidth = 400;

type SidebarProps = {
    open: boolean;
    handleDrawerClose: () => void;
};

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));

export const Sidebar: React.FC<SidebarProps> = ({open, handleDrawerClose}) => {
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
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <AddRoomDialogContextProvider>
                <RoomsList/>
            </AddRoomDialogContextProvider>
        </Drawer>
    );
}