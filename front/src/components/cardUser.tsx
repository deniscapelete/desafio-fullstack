import { useUserContext } from "@/contexts/userContext"
import { Button } from "./button";


export function CardUser() {
            const userContext = useUserContext();

            if (!userContext) {
                        return <div>Carregando...</div>; // ou qualquer outra mensagem de fallback
            }
            const { user } = userContext
            if (user) {
                        return (
                                    <div className=" border border-orange-400 rounded-lg p-2 justify-center  items-center content-center flex flex-col">
                                                <h2 className="text-xl text-center font-bold text-orange-400">Dados do usuário</h2>
                                                <div className="space-y-1 py-5 flex-1">
                                                            <p className="text-gray-700"><span className="font-semibold text-orange-400">Nome:</span> {user?.name}</p>
                                                            <p className="text-gray-700"><span className="font-semibold text-orange-400">Email:</span> {user?.email}</p>
                                                </div>
                                                <hr className="border border-orange-400 w-full" />
                                                <h2 className="text-xl text-center font-bold w-full text-orange-400 pt-5">Meu plano</h2>
                                                <div className="space-y-1 my-5 flex-1">
                                                            <p className="text-gray-700">Nenhum plano contratado</p>
                                                </div>
                                                <div className="space-y-2 w-full">
                                                            <Button>
                                                                        Ver planos
                                                            </Button>
                                                </div>

                                    </div>
                        )
            }
}