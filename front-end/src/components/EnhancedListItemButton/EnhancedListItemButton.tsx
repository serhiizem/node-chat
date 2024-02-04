import React from "react";
import {ListItemButton as MuiListItemButton, ListItemButtonProps, ListItemIcon, ListItemText} from "@mui/material";

type EnhancedListItemButtonProps = ListItemButtonProps & {
    title: string;
    icon: React.ReactNode;
    isSelected?: boolean;
}

export const EnhancedListItemButton: React.FC<EnhancedListItemButtonProps> = ({
    title,
    icon,
    onClick,
    isSelected = false
}) => {
    return (
        <MuiListItemButton
            onClick={onClick}
            selected={isSelected}
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={title}/>
        </MuiListItemButton>
    );
}