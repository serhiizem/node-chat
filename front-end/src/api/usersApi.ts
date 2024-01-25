import {axiosInstance as axios} from "./apiClient";
import {User} from "../types/User";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../types/AuthResponse";

const baseUrl = '/api/users';

export const login = (user: User): Promise<AxiosResponse<AuthResponse>> =>
    axios.post<AuthResponse>(`${baseUrl}/login`, user);