import {createBrowserRouter} from "react-router-dom";
import {Chat} from "../pages/Chat/Chat";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import {Login} from "../pages/Login/Login";
import {SignUp} from "../pages/SignUp/SignUp";
import {Room} from "../features/Room/Room";

export const router = createBrowserRouter([
    {
        path: "/chat",
        element: (
            <RequireAuth fallbackPath={"/login"}>
                <Chat/>
            </RequireAuth>
        ),
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
    }
]);