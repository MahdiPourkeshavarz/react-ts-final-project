import { API_ROUTES } from '../constants'
import { httpRequest } from '../lib/axiosConfig'
import { TResponseGetUser } from '../types'

export async function getUserData(userId: string): Promise<TResponseGetUser> {
  try {
    const response = await httpRequest.get(`${API_ROUTES.USERS_BASE}/${userId}`)
    return response.data
  } catch (e) {
    console.log(e)
    throw new Error('error in getting user data')
  }
}
