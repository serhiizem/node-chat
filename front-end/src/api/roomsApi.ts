import {axiosInstance as axios} from "./apiClient";
import {Room} from "../types/Room";
import {AxiosResponse} from "axios";

const baseUrl = '/api/rooms';

export const getRooms = (): Promise<AxiosResponse<Room[]>> =>
    axios.get<Room[]>(baseUrl);

export const createRoom = (room: Omit<Room, "roomId">): Promise<AxiosResponse<Room>> =>
    axios.post<Room>(baseUrl, room);