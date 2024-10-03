/* eslint-disable @typescript-eslint/no-unused-vars */
import { httpRequest } from '../lib/axiosConfig'

export async function editOrder(endpoint: string, deliveryStatus: boolean) {
  try {
    await httpRequest.patch(endpoint, { deliveryStatus })
  } catch (e) {
    console.log(e)
  }
}
