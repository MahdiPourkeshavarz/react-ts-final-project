import axios from "axios";

import { BASE_URL } from "../constants";
import { getRefreshToken } from "../api/getRefreshToken";

export const httpRequest = axios.create({
  baseURL: BASE_URL,
});

httpRequest.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    const originRequest = error.config;
    const refresh = localStorage.getItem("refreshToken");

    if (status === 401 && refresh) {
      return getRefreshToken(refresh)
        .then((res) => {
          localStorage.setItem("accessToken", res.access);
          originRequest.headers.Authorization = `Bearer ${res.access}`;
          return httpRequest.request(originRequest);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);
