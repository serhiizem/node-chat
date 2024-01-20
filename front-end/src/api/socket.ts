import {io, Socket} from 'socket.io-client';

const URL = 'http://localhost:8082';

export const socket: Socket = io(URL);