import { createContract } from "@/api/create-contract"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export function useContract() {

    const {
    mutateAsync: createContractFn,
    isPending: isPendingCreateContract,
  } = useMutation({
    mutationFn: createContract,
    onSuccess() {
      toast.success("Plano contratado com sucesso.")
    },
    onError() {
      toast.error("Ocorreu um erro")
    }
  })

  return {
    createContractFn,
    isPendingCreateContract
  }
}