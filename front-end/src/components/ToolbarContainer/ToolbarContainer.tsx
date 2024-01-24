import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {styled} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import {sidebarWidth} from "../../pages/Chat/components/Sidebar";

interface ToolbarContainerProps extends MuiAppBarProps {
    open?: boolean;
}

export const ToolbarContainer = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<ToolbarContainerProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${sidebarWidth}px)`,
        marginLeft: `${sidebarWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));