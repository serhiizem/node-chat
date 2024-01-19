import {axiosInstance as axios} from "./axiosApi";

const baseUrl = 'http://localhost:8082/api/messages';

export const sendMessage = (message: string) => axios.post(baseUrl, {message});
