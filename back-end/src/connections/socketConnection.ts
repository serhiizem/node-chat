import {Server} from "socket.io";

export const listenToWebsocketConnection = (websocketServer: Server) => {
    websocketServer.on("connection", (socket) => {
        socket.on("join_room", (room) => socket.join(room));
    });
};