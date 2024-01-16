import axios from "axios";
export default axios.create({
  baseURL: "https://tumblr-bkend.onrender.com",
  // baseURL: "http://127.0.0.1:4000",
});
