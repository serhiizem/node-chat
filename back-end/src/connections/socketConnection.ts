import {Server} from "socket.io";

export class WebSocketConnection {

    constructor(websocketServer: Server) {
        websocketServer.on("connection", (socket) => {
            socket.on("join_room", (room) => socket.join(room));
        });
    }
}
