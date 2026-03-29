import axios from "axios";

const API = axios.create({
  baseURL: "https://gyaansetu-backend-5eez.onrender.com"
});

export default API;
