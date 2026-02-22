import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const generateInterview = (data, token) =>
  API.post("/interview/generate", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);