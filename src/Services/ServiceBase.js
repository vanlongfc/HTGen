// import axiosClient from "./axiosClient";

const { axiosClient, axiosClientPdf } = require("./axiosClient");
export const GET = (url, params) => {
  return axiosClient.get(url, params);
};

export const POST = (url, body) => {
  return axiosClient.post(url, body);
};

export const PATCH = (url, body) => {
  return axiosClient.patch(url, body);
};

export const DELETE = (url, params) => {
  return axiosClient.delete(url, params);
};

export const GETFILE = (url, params) => {
  return axiosClientPdf.get(url, params);
};

export const POSTFILE = (url, params) => {
  return axiosClientPdf.post(url, params);
};

export default { GET, POST, PATCH, DELETE, GETFILE, POSTFILE };
