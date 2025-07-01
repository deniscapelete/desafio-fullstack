import { getActiveContract } from "@/api/get-active-contract"
import { PlanActiveContent } from "./components/plan-active-content"
import { useQuery } from "@tanstack/react-query"

export const Index = () => {
  const { data: contract, isPending: isPendingContract } = useQuery({
    queryKey: ['contract-active'],
    queryFn: getActiveContract,
    retry: false
  })

  return (
    <div className="flex-1 flex flex-col items-center  h-screen">
      <h1 className="text-gray-500 text-2xl">
        Sistema de assinatura do plano InMediam
      </h1>
      <div className="justify-center">
        {contract && (
          <PlanActiveContent plan={contract.plan} />
        )}

        {
          !contract && !isPendingContract && (
            <div></div>
          )
        }
      </div>
    </div>
  )
}