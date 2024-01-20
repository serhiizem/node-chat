import {Server} from "socket.io";

export const listenToWebsocketConnection = (server: Server) => {
    server.on('connection', (socket) => {
        socket.on('join_room', (room) => socket.join(room));
    });
};