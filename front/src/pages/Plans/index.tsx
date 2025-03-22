import { CardPlan } from "@/components/cardPlan"
import { Plan } from "@/type/plan";
import { useEffect, useState } from "react";

export const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const getPlans = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/plans`);
    const json = await response.json();
    setPlans(json);
    console.log(json)
  }

  useEffect(() => {
    getPlans();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen p-2 bg-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {plans.map(item =>
          <CardPlan key={item.id} plan={item} />
        )}
      </div >
    </div >
  )
}