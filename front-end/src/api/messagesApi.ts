import {axiosInstance as axios} from "./apiClient";
import {Message} from "../types/Message";
import {AxiosResponse} from "axios";

const baseUrl = "/api/messages";

export const sendMessage = (message: Message): Promise<AxiosResponse<Message>> =>
    axios.post<Message>(baseUrl, message);
