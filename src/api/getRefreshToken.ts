import { httpRequest } from "../lib/axiosConfig";
import { API_ROUTES } from "../constants";

export async function getRefreshToken(refresh: string) {
  try {
    const response = await httpRequest.post(API_ROUTES.AUTH_TOKEN, {
      refresh: refresh,
    });
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
