import { api } from "@/lib/axios";
import type { Contract } from "./get-active-contract";

interface UpdateContractBody {
  plan_id: number
  contractId: number
}

export interface UpdateContractResponse extends Contract{}

export async function updateContract({plan_id, contractId}: UpdateContractBody) {
  const response = await api.put<UpdateContractResponse>(`contracts/${contractId}`, {
    plan_id
  })
  
  return response.data
}