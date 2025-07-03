import { updateContract } from "@/api/update-contract"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { AxiosError } from 'axios'
import { queryClient } from "@/lib/react-query"

export function useUpdateContract() {

      const {
    mutateAsync: updateContractFn,
    isPending: isPendingUpdateContract,
  } = useMutation({
    mutationFn: updateContract,
    onSuccess(data) {
      toast.success("Plano alterado com sucesso.")
      queryClient.setQueryData(['contract-active'], data)
    },
    onError(error: AxiosError<any>) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
    const response = error.response
    const statusCode = response?.status || 500
    const errorMessages: { [key: number]: ()=> string} =
      {
        404: () => "Contrato não encontrado",
        422: () => {
          const validationErrors = response?.data.errors
          return Object.values(validationErrors).join(' ')
        },
        500: () => 'Ocorreu um erro.',
      }
     const message = errorMessages[statusCode];
     toast.error(message)
    }
  })

  return {
    updateContractFn,
    isPendingUpdateContract
  }
}