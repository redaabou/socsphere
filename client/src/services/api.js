// client/src/services/api.js

import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

export const lookupIoc = async (value) => {
  const response = await api.post("/lookup", {
    value,
  });

  return response.data;
};