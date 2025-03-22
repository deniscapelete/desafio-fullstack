import { CardUser } from "@/components/cardUser"
import { UserContextProvider } from "@/contexts/userContext"

export const Home = () => {
  return (
    <div className="flex flex-col items-center  h-screen p-2">
      <h1 className="text-orange-400 text-2xl">
        Desafio para Desenvolvedor - Inmediam
      </h1>
      <div className="flex-1 content-center">
        <UserContextProvider>
          <CardUser />
        </UserContextProvider>
      </div>
    </div>
  )
}