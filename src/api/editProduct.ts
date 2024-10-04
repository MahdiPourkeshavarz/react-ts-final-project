import { API_ROUTES } from '../constants'
import { httpRequest } from '../lib/axiosConfig'

export async function editProduct(product: FormData, id: string | undefined) {
  const response = await httpRequest.patch(
    `${API_ROUTES.PRODUCT_BASE}/${id}`,
    product,
  )
  return response.data
}
