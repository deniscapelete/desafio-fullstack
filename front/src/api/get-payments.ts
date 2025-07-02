import { api } from '@/lib/axios'

export interface payment {
    id:number
    contract_id: number
    due_date: string
    amount_due: number
    method_payment: string
    category_payment: string
    date_payment: string
    amount_paid: number
}

export interface GetPaymentResponse extends payment{}

export async function getPayments() {
  const response = await api.get<GetPaymentResponse[]>('/payments')
  return response.data
}
