import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PlanCard() {
  return (
    <Card className="w-72 h-72">
      <CardHeader className="w-[85%] bg-linear-to-r from-orange-500 to-orange-400 py-2 text-white">
        <CardTitle className="text-xl">Até 10 vistorias</CardTitle>
        <CardDescription className="text-white font-semibold text-md">/clientes ativos</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-4">
        <div>
          <p className="font-semibold text">Preço:</p>
          <p><span className="text-2xl font-bold">R$87,00</span> /mês</p>
        </div>
        <div>
          <p>Armazenamento:</p>
          <p className="text-2xl font-bold">10 GB</p>
        </div>
      </CardContent>
    </Card>
  )
}