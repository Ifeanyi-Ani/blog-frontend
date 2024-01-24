import axios from "axios";
const API = axios.create({
  baseURL: "https://tumblr-bkend.onrender.com",
  // baseURL: "http://127.0.0.1:4000",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("currentUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("currentUser")!).token
    }`;
  }
  return req;
});
export default API;
