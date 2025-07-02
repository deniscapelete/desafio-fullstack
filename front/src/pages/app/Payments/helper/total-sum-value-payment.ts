import type { payment } from "@/api/get-payments";

export function totalSumValuePayment(arr: payment[]) {
  return arr.reduce((acc, payment) => acc + Number(payment.amount_paid), 0);
}