import { API_ROUTES } from "../constants";
import { httpRequest } from "../lib/axiosConfig";

export async function getRefreshToken(refresh: string) {
  try {
    const response = await httpRequest.post(API_ROUTES.AUTH_TOKEN, {
      refresh: refresh, // Include the refresh token in the body
    });
    return response.data;
  } catch (e) {
    return Promise.reject(e); // Properly reject the error
  }
}
