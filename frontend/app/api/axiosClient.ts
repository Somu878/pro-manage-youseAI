'use client'


import axios from "axios";
import { getCookie } from "cookies-next";
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {

    const token = getCookie("token") as string;
    if (token) {
        config.headers["authorization"] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;