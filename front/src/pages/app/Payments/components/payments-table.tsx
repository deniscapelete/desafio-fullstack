import type { payment } from "@/api/get-payments";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { totalSumValuePayment } from "../helper/total-sum-value-payment";
import { formatCurrencyToBrl } from "@/helper/format-currency-to-brl";

interface PaymentsTableProps {
  payments: payment[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[900px] w-full">
        <TableCaption>Listagem de pagamentos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nº do Contrato</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Mensalidade</TableHead>
            <TableHead>Data de vencimento</TableHead>
            <TableHead>Método de pagamento</TableHead>
            <TableHead>Data de pagamento</TableHead>
            <TableHead className="text-right">Valor pago</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.contract_id}</TableCell>
              <TableCell>{payment.category_payment}</TableCell>
              <TableCell>{formatCurrencyToBrl(payment.amount_due)}</TableCell>
              <TableCell>{payment.due_date}</TableCell>
              <TableCell>{payment.method_payment}</TableCell>
              <TableCell>{payment.date_payment}</TableCell>
              <TableCell className="text-right">{formatCurrencyToBrl(payment.amount_paid)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell className="text-right">{payments && formatCurrencyToBrl(totalSumValuePayment(payments))}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}