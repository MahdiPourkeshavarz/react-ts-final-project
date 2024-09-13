import { httpRequest } from "../lib/axiosConfig";

export async function getData(endpoints: string, id?: string) {
  const url = id ? `${endpoints}/${id}` : `${endpoints}`;
  try {
    const response = await httpRequest.get(url);
    return response.data;
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
