import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function PaymentsTableSkeleton() {
  return (
    <Table className="table-fixed w-full">
      <TableCaption>Listagem de pagamentos realizados.</TableCaption>
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
        <TableRow>
          <TableCell className="font-medium">
            <Skeleton className="h-5 w-[140px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-[140px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-[140px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-[140px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-[140px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-[140px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-5 w-[140px]" />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-5 w-[140px]" />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}