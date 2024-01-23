import {
    createBrowserRouter
} from "react-router-dom";
import {Chat} from "../pages/Chat/Chat";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Chat />
    }
]);