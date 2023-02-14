import axios from "axios";
import queryString from "query-string";
import refreshToken from "Redux/Sagas/refreshToken";
import { BASE_URL } from "./ServiceURL";
import _ from "lodash";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  paramsSerializer: (params) => queryString.stringify(params, { sort: false }),
});

axiosClient.interceptors.request.use(
  async (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    if (response) return response;
  },
  async function (error) {
    const { config } = error;

    const refreshtoken = localStorage.getItem("refreshtoken");
    let token = localStorage.getItem("token");

    if (
      error?.response?.status === 401 &&
      !!refreshtoken &&
      !!token &&
      !config.url.includes("auth") &&
      (config.retry || 0) < 4
    ) {
      config.retry = config.retry ? config.retry + 1 : 1;

      const data = refreshToken();
      token = typeof data === "string" ? data : await data;

      // setting updated token
      if (token) {
        localStorage.setItem("token", token);

        return axiosClient(config);
      }
    }
    return Promise.reject(error);
  }
);

const axiosClientPdf = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClientPdf.interceptors.request.use(
  async (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    config.responseType = "blob";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClientPdf.interceptors.response.use(
  function (response) {
    if (response) return response;
  },
  async function (error) {
    const { config } = error;

    const refreshtoken = localStorage.getItem("refreshtoken");
    let token = localStorage.getItem("token");

    if (
      error?.response?.status === 401 &&
      !!refreshtoken &&
      !!token &&
      !config.url.includes("auth") &&
      (config.retry || 0) < 4
    ) {
      config.retry = config.retry ? config.retry + 1 : 1;

      const data = refreshToken();
      token = typeof data === "string" ? data : await data;

      // setting updated token
      if (token) {
        localStorage.setItem("token", token);

        return axiosClient(config);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosClient, axiosClientPdf };
