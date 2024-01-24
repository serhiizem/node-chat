import React from "react";
import {Divider, Drawer, IconButton} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {AddRoomDialogContextProvider} from "../../../contexts/AddRoomDialogContext";
import {RoomsList} from "../../../features/RoomsList/RoomsList";
import {HeaderContainer} from "../../../components/HeaderContainer/HeaderContainer";

export const sidebarWidth = 400;

type SidebarProps = {
    open: boolean;
    handleDrawerClose: () => void;
};

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
            <HeaderContainer>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </HeaderContainer>
            <Divider/>
            <AddRoomDialogContextProvider>
                <RoomsList/>
            </AddRoomDialogContextProvider>
        </Drawer>
    );
}