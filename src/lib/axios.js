import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cerulean-marlin-wig.cyclic.app",
});

export default axiosInstance;
