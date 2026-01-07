import axios from "axios";

export const api = axios.create({
  baseURL: "https://fullstack-intern-assignment-z2rp.onrender.com/api",
});

export const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = token;
};
