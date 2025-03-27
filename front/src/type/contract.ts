import { Plan } from "./plan"

export type Contract = {
            id: number,
            user_id: number,
            plan_id: number,
            price: number,
            active: boolean,
            created_at: string;
            payment_date: string | null,
            plan: Plan;
}