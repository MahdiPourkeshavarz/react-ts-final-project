import { httpRequest } from "../lib/axiosConfig";

export async function getData<T>(endpoints: string): Promise<Partial<T>> {
  try {
    const response = await httpRequest.get(endpoints);
    return response.data;
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
