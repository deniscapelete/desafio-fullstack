import { getPayments } from "@/api/get-payments"

import { useQuery } from "@tanstack/react-query"

import { PaymentsTable } from "./components/payments-table"
import { PaymentsTableSkeleton } from "./components/payments-table-skeleton"

export function Payments() {

  const { data: payments, isPending: isPendingPayments } = useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
    retry: false
  })
  return (
    <div>
      {isPendingPayments &&
        <PaymentsTableSkeleton />
      }

      {!isPendingPayments && payments?.length === 0 &&
        <p className="text-center text-gray-500 text-2xl">Nenhum informação de pagamento encontrada.</p>
      }

      {!isPendingPayments && payments !== undefined && payments?.length > 0 && (
        <div>
          <PaymentsTable payments={payments} />
        </div>
      )}
    </div >
  )
}