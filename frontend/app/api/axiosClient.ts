'use client'


import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
    // const token = localStorage.getItem("token");
    // console.log("Token from axios", token)
    // if (token) {
    //     config.headers["authorization"] = token;
    // }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;