import {axiosInstance as axios} from "./apiClient";

const baseUrl = "/api/messages";

export const sendMessage = (message: string) => axios.post(baseUrl, {message});
