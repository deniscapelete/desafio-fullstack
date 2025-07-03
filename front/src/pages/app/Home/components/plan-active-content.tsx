
import type { Plan } from "@/api/get-plans"
import { Card } from "@/components/ui/card"
import { formatCurrencyToBrl } from "@/helper/format-currency-to-brl"

interface PlanActiveContent {
  plan: Plan
}

export function PlanActiveContent({ plan }: PlanActiveContent) {
  return (
    <Card className="w-[25rem] h-fit mt-5 p-4">
      <h2 className="text-xl text-center font-bold text-orange-500 pb-4 border-b">Seu plano atual:</h2>
      <div className="space-y-2">
        <p><span className="font-semibold">{plan.description}</span></p>
        <p><span className="font-semibold">{plan.gigabytesStorage} GB</span>  de armazenamento</p>
        <p><span className="font-semibold">{formatCurrencyToBrl(plan.price)}</span> / mês</p>
      </div>
    </Card>
  )
}

