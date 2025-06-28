import { getPlans } from "@/api/get-plans";
import { PlanCard } from "./components/plan-card";
import { useQuery } from "@tanstack/react-query";
import { PlanCardSkeleton } from "./components/plan-card-skeleton";

export function Plans() {

  const { data: plans, isPending: isPendingPlan } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
  })

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {isPendingPlan &&
          Array.from({ length: 6 }).map((_, index) => (
            <PlanCardSkeleton key={index} />
          ))
        }

        {!isPendingPlan &&
          plans?.map(plan => {
            return <PlanCard key={plan.id} plan={plan} />
          })
        }

      </div>
    </div>
  )
}