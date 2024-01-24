import {createBrowserRouter} from "react-router-dom";
import {Chat} from "../pages/Chat/Chat";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import {Login} from "../pages/Login/Login";
import {SocketIoTest} from "../features/SocketIoTest/SocketIoTest";
import {SignUp} from "../pages/SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SocketIoTest/>
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
        path: "/chat",
        element: (
            <RequireAuth fallbackPath={"/login"}>
                <Chat/>
            </RequireAuth>
        )
    }
]);