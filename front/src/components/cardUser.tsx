
import { Button } from "./button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "@/type/user";
import { Contract } from "@/type/contract";

export function CardUser() {
            const [user, setUser] = useState<User>();
            const [loading, setLoading] = useState<boolean>(false)
            const [contract, setContract] = useState<Contract>();

            const getUser = async () => {
                        setLoading(true);
                        try {
                                    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`);
                                    const user = await response.json();
                                    setUser(user);
                                    console.log(user)
                                    try {
                                                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user?.id}/contracts`);
                                                const json = await response.json();
                                                setContract(json.contract);
                                    } catch {
                                                console.error("Falha ao carregar dados do usuário. Tente novamente.");
                                    }
                        } catch {
                                    console.error("Falha ao carregar dados do usuário. Tente novamente.");
                        }
                        setLoading(false);
            }

            useEffect(() => {
                        getUser();
            }, []);

            const price = contract?.price.toString().replace(".", ",");

            if (loading) {
                        return <div className="text-gray-700">Carregando...</div>
            }
            if (!user) {
                        return <div className="text-gray-700">Falha ao carregar dados do usuário.</div>
            }
            if (user) {
                        return (
                                    <div className="rounded-lg p-2 justify-center  items-center content-center flex flex-col shadow-md shadow-gray-300 bg-white">
                                                <h2 className="text-xl text-center font-bold text-orange-400">Dados do usuário</h2>
                                                <div className="space-y-1 py-5 flex-1">
                                                            <p className="text-gray-700"><span className="font-semibold text-orange-400">Nome:</span> {user?.name}</p>
                                                            <p className="text-gray-700"><span className="font-semibold text-orange-400">Email:</span> {user?.email}</p>
                                                </div>
                                                <hr className="border border-orange-400 w-full" />
                                                <h2 className="text-xl text-center font-bold w-full text-orange-400 pt-5">Meu plano</h2>
                                                {contract ?
                                                            <div className="space-y-1 my-5 flex-1">
                                                                        <p className="text-gray-700"><span className="font-semibold text-orange-400">Contrato:</span>  Nº: {contract?.id}</p>
                                                                        <p className="text-gray-700"><span className="font-semibold text-orange-400">Descrição:</span>  {contract?.plan?.description}</p>
                                                                        <p className="text-gray-700"><span className="font-semibold text-orange-400">Armazenamento:</span>  {contract?.plan?.gigabytesStorage} GB</p>
                                                                        <p className="text-gray-700"><span className="font-semibold text-orange-400">Número de clientes:</span>  {contract?.plan?.numberOfClients}</p>
                                                                        <p className="text-gray-700"><span className="font-semibold text-orange-400">Preço:</span>  R$ {price}</p>
                                                                        <p className="text-gray-700"><span className="font-semibold text-orange-400">Status:</span> {contract?.active ? 'Ativo' : 'Inativo'}</p>
                                                                        <p className="text-gray-700"><span className="font-semibold text-orange-400">Data de pagamento:</span>  {contract?.payment_date}</p>
                                                            </div>
                                                            :
                                                            <div className="space-y-1 my-5 flex-1">
                                                                        <p className="text-gray-700">Nenhum plano contratado</p>
                                                            </div>
                                                }
                                                <div className="space-y-2 w-full">
                                                            <Link to={`/plans/${user.id}`}>
                                                                        <Button>
                                                                                    Ver planos
                                                                        </Button>
                                                            </Link>
                                                </div>

                                    </div>
                        )
            }
}