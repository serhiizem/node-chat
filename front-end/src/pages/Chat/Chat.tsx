import React from 'react';
import {Box, CssBaseline} from "@mui/material";
import {Main} from "./components/Main";
import {ToolBar} from "./components/ToolBar";
import {Outlet} from "react-router-dom";
import {Sidebar} from "./components/Sidebar";
import {HeaderContainer} from "../../components/HeaderContainer/HeaderContainer";

export const Chat: React.FC = () => {

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <ToolBar
                open={open}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Sidebar
                open={open}
                handleDrawerClose={handleDrawerClose}
            />
            <Main open={open}>
                <HeaderContainer />
                <Outlet/>
            </Main>
        </Box>
    );
}
