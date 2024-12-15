import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://localhost:7081/api",
}); 