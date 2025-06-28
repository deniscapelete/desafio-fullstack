import { api } from "@/lib/axios";

export interface Plan {
  id: number
  description: string
  numberOfClients: number
  gigabytesStorage: number
  price: number
  active: boolean
}

export interface GetPlanResponse extends Plan {}

export async function getPlans(){
  const response = await api.get<GetPlanResponse[]>('/plans');
   return response.data
}