import {Server} from "socket.io";

module.exports = (server: Server) => {
    server.on('connection', (socket) => {
        socket.on('join_room', (room) => socket.join(room));
    });
};