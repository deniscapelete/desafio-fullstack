import { getActiveContract } from "@/api/get-active-contract"
import { PlanActiveContent } from "./components/plan-active-content"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export const Index = () => {
  const { data: contract, isPending: isPendingContract } = useQuery({
    queryKey: ['contract-active'],
    queryFn: getActiveContract,
    retry: false
  })

  return (
    <div className="flex-1 flex flex-col items-center  h-screen space-y-2">
      <h1 className="text-gray-500 text-2xl text-center">
        Sistema de assinatura do plano InMediam
      </h1>
      <div className="justify-center">
        {contract && (
          <PlanActiveContent plan={contract.plan} />
        )}
      </div>
      {
        !contract && !isPendingContract && (
          <div className="text-xl text-center">
            <p>Nenhum plano contratado pelo usuário.</p>
            <p className="text-sm text-muted-foreground">Para consultar nossos planos disponíveis <Link className="text-orange-500" to={'/planos'}>clique aqui</Link></p>
          </div>

        )
      }
    </div>
  )
}