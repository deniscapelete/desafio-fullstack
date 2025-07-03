import type { Plan } from "@/api/get-plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDescription } from "../helper/description";
import { formatCurrencyToBrl } from "@/helper/format-currency-to-brl";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlanSelectedCardContent } from "./plan-selected-card-content";
import type { Contract } from "@/api/get-active-contract";
import { useState } from "react";

interface PlanCardProps {
  plan: Plan
  contract?: Contract
}

export function PlanCard({ plan, contract }: PlanCardProps) {
  const isActivePlan = contract?.plan?.id === plan.id
  const existContractActive = contract?.active

  const [open, setOpen] = useState(false);

  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={isActivePlan} className="text-left">
        <Card
          className="w-72 h-fit hover:opacity-65 hover:cursor-pointer data-[active=true]:border-orange-500 data-[active=true]:border-2 data-[active=true]:cursor-not-allowed data-[active=true]:opacity-65"
          data-active={isActivePlan}

        >
          <CardHeader className="w-[85%] bg-linear-to-r from-orange-500 to-orange-400 py-2 text-white">
            <CardTitle className="text-xl">{formatDescription(plan.description)}</CardTitle>
            <CardDescription className="text-white font-semibold text-md">/clientes ativos</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <div>
              <p className="font-semibold text">Preço:</p>
              <p><span className="text-2xl font-bold">{formatCurrencyToBrl(plan.price)}</span> /mês</p>
            </div>
            <div>
              <p>Armazenamento:</p>
              <p className="text-2xl font-bold">{plan.gigabytesStorage} GB</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <PlanSelectedCardContent plan={plan} contractId={contract?.id} existContractActive={existContractActive} setOpen={setOpen} />
    </Dialog>
  )
}