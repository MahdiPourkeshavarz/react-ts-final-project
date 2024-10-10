import { API_ROUTES } from '../constants'
import { httpRequest } from '../lib/axiosConfig'
import { TOrderRequest } from '../types'

export async function createOrder(orderData: TOrderRequest) {
  try {
    const response = await httpRequest.post(API_ROUTES.ORDERS_BASE, orderData)
    console.log(response.data)
  } catch (e) {
    console.log(e)
  }
}
