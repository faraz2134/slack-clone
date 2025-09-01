import axios from "axios";

//const BASE_URL =
  //import.meta.env.MODE === "development"

     //: "https://slackbackend-ashy.vercel.app/api";
     const BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});