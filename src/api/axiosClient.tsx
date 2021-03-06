import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

axiosClient.interceptors.request.use(async (config) => {
  console.log(config);
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      console.log("ok.data", response.data);
      return response.data;
    }
    console.log("ok", response);
    return response;
  },
  (err) => {
    console.log(err);
    throw err;
  }
);

export default axiosClient;
