import axios from "axios";

const api = axios.create({
  baseURL: "https://www.omdbapi.com",
  params: {
    apikey: "b5e6c8d7"
  }
});

export default api;
