import {axiosInstance as axios} from "./apiClient";
import {User} from "../types/User";

const baseUrl = '/api/users';

export const login = (user: User) => axios.post(`${baseUrl}/login`, user);