import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `http://${import.meta.env.VITE_API_URL}` : "http://localhost:3001",
  headers: { "Content-Type": "application/json",
    "Acces-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Content-Type, Authorization, X-Requested-With"
   },
});
