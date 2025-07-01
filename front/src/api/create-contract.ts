import { api } from "@/lib/axios";
import type { Contract } from "./get-active-contract";
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