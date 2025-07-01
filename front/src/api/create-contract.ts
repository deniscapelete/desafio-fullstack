import { api } from "@/lib/axios";
import type { Plan } from "./get-plans";

export interface Contract {
  id: number
  plan: Plan
  active: boolean
  created_at: string
}

interface CreateContractBody {
  plan_id: number
}

export interface CreateContractResponse extends Contract{}

export async function createContract({plan_id}: CreateContractBody) {
  const response = await api.post<CreateContractResponse>("/contracts", {
    plan_id
  })
  
  return response.data
}