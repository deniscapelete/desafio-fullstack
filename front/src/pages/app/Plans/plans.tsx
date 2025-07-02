import { getPlans } from "@/api/get-plans";
import { PlanCard } from "./components/plan-card";
import { useQuery } from "@tanstack/react-query";
import { PlanCardSkeleton } from "./components/plan-card-skeleton";
import { getActiveContract } from "@/api/get-active-contract";

export function Plans() {

  const { data: plans, isPending: isPendingPlan } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
  })

  const { data: contract, isPending: isPendingContract } = useQuery({
    queryKey: ['contract-active'],
    queryFn: getActiveContract,
    retry: false
  })

  const isPending = isPendingPlan || isPendingContract

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {isPendingPlan &&
          Array.from({ length: 6 }).map((_, index) => (
            <PlanCardSkeleton key={index} />
          ))
        }

        {!isPending && plans &&
          plans?.map(plan => {
            return <PlanCard key={plan.id} plan={plan} contract={contract} />
          })
        }

      </div>
    </div>
  )
}