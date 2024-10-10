import { API_ROUTES } from '../constants'
import { httpRequest } from '../lib/axiosConfig'
import { TResponseEditUser } from '../types'

export async function editProduct(
  product: FormData,
  id: string | undefined,
): Promise<TResponseEditUser> {
  const response = await httpRequest.patch(
    `${API_ROUTES.PRODUCT_BASE}/${id}`,
    product,
  )
  return response.data.status
}
