import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ENV == 'development' ? process.env.NEXT_PUBLIC_DEV_URL : process.env.NEXT_PUBLIC_LIVE_URL

export const axiosInstance = axios.create({
    baseURL:baseUrl,
    withCredentials:true
})  
