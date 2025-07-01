import { api } from '@/lib/axios'
import type { Plan } from './get-plans'

export interface Contract {
  id: number
  plan: Plan
  active: boolean
  created_at: string
}

export interface GetActiveContractResponse extends Contract{}

export async function getActiveContract(){
  const response = await api.get<GetActiveContractResponse>('/contracts')
  console.log(response.data)
  return response.data
}
