/* eslint-disable @typescript-eslint/no-unused-vars */
import { httpRequest } from '../lib/axiosConfig'

export async function deleteData(endpoint: string) {
  try {
    await httpRequest.delete(endpoint)
  } catch (e) {
    console.log(e)
  }
}
