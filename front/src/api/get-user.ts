import { api } from '@/lib/axios'

export interface GetUserResponse {
    id: number
    name: string
    email: string    
}

export async function getUser() {
  const response = await api.get<GetUserResponse>('/user')
  return response.data
}
