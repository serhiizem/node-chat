import {axiosInstance as axios} from "./axiosApi";

const baseUrl = '/api/messages';

export const sendMessage = (message: string) => axios.post(baseUrl, {message});
