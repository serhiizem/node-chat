import {axiosInstance as axios} from "./apiClient";
import {Room} from "../types/Room";
import {AxiosResponse} from "axios";
import {Message} from "../types/Message";

const baseUrl = '/api/rooms';

export const getRooms = (): Promise<AxiosResponse<Room[]>> =>
    axios.get<Room[]>(baseUrl);

export const createRoom = (room: Omit<Room, "_id">): Promise<AxiosResponse<Room>> =>
    axios.post<Room>(baseUrl, room);

export const getRoomMessages = (roomId: string): Promise<AxiosResponse<Message[]>> =>
    axios.get<Message[]>(`${baseUrl}/${roomId}/messages`);