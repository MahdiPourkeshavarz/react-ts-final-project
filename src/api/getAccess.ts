import { API_ROUTES } from '../constants'
import { httpRequest } from '../lib/axiosConfig'
import { AuthformData } from '../types'

export async function submitUser(formdata: AuthformData): Promise<boolean> {
  const username = formdata.username
  const password = formdata.password
  try {
    const response = await httpRequest.post(API_ROUTES.AUTH_LOGIN, {
      username,
      password,
    })
    const accessToken = await response.data.token.accessToken
    const refreshToken = await response.data.token.refreshToken
    const user = await response.data.data.user._id
    const userRole = await response.data.data.user.role
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('user', user)
    localStorage.setItem('role', userRole)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}
