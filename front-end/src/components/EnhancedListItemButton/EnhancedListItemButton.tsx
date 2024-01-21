import React from "react";
import {ListItemButton as MuiListItemButton, ListItemButtonProps, ListItemIcon, ListItemText} from "@mui/material";

type EnhancedListItemButtonProps = ListItemButtonProps & {
    title: string;
    icon: React.ReactNode;
}

export const EnhancedListItemButton: React.FC<EnhancedListItemButtonProps> = ({
    title,
    icon,
    onClick
}) => {
    return (
        <MuiListItemButton onClick={onClick}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={title}/>
        </MuiListItemButton>
    );
}