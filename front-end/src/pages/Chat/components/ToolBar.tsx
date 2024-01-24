import {IconButton, Toolbar} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { ToolbarContainer } from "../../../components/ToolbarContainer/ToolbarContainer";

type ToolBarProps = {
    open: boolean;
    handleDrawerOpen: () => void;
};

export const ToolBar: React.FC<ToolBarProps> = ({open, handleDrawerOpen}) => {
    return (
        <ToolbarContainer position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{mr: 2, ...(open && {display: 'none'})}}
                >
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
        </ToolbarContainer>
    );
}