import type { Plan } from "@/api/get-plans";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCurrencyToBrl } from "@/helper/format-currency-to-brl";
import { useContract } from "@/hooks/use-contract";
import { useUpdateContract } from "@/hooks/use-update-contract";
import { DialogClose } from "@radix-ui/react-dialog";

interface PlanSelectedCardContentProps {
  plan: Plan
  contractId?: number
  existContractActive?: boolean
}

export function PlanSelectedCardContent({ plan, contractId, existContractActive }: PlanSelectedCardContentProps) {

  const { createContractFn, isPendingCreateContract } = useContract()
  const { updateContractFn, isPendingUpdateContract } = useUpdateContract()

  function handleCreateOrUpdateContract() {
    if (contractId) {
      return updateContractFn({ plan_id: plan.id, contractId })
    }
    createContractFn({ plan_id: plan.id })
  }

  return (
    <DialogContent className="flex flex-col w-80 h-auto p-4">
      <DialogHeader>
        <DialogTitle className="text-orange-500 py-4 text-center">
          {!existContractActive && 'Confirmar contratação do plano'}
          {existContractActive && 'Confirmar alteração do plano'}
        </DialogTitle>
      </DialogHeader>
      <DialogDescription asChild>
        <div className="text-left space-y-2">
          <p><span className="font-bold">Descrição: </span>{plan.description}</p>
          <p><span className="font-bold">Preço: </span>{formatCurrencyToBrl(plan.price)}</p>
          <p><span className="font-bold">Armazenamento: </span>{plan.gigabytesStorage}</p>
        </div>
      </DialogDescription>
      <DialogFooter className="flex flex-row pt-4">
        <DialogClose asChild>
          <Button variant="outline" className="me-auto hover:cursor-pointer">Cancelar</Button>
        </DialogClose>
        <Button
          className="bg-orange-500 hover:bg-orange-600 hover:cursor-pointer"
          onClick={handleCreateOrUpdateContract}
          disabled={isPendingCreateContract || isPendingUpdateContract}
        >
          {isPendingCreateContract}
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}