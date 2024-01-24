import {createBrowserRouter} from "react-router-dom";
import {Chat} from "../pages/Chat/Chat";
import {Login} from "../pages/Login/Login";
import {SignUp} from "../pages/SignUp/SignUp";
import {SocketIoTest} from "../features/SocketIoTest/SocketIoTest";
import {Room} from "../features/Room/Room";

export const router = createBrowserRouter([
    {
        path: "/chat",
        element: <Chat/>,
        children: [
            {
                path: "room/:roomId",
                element: <Room />
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <SignUp/>
    },
    {
        path: "/socket",
        element: <SocketIoTest/>
    }
]);