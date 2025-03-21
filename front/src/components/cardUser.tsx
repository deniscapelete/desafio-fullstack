import { User } from "@/type/user";
import { useEffect, useState } from "react";

export function CardUser() {
            const [user, setUser] = useState<User>();

            const getUser = async () => {
                        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`);
                        const json = await response.json();
                        setUser(json)
            }
            useEffect(() => {
                        getUser();
            }, []);

            return (
                        <div className=" border border-orange-400 rounded-lg p-2 justify-center  items-center content-center">
                                    <h2 className="text-xl text-center font-bold text-orange-400">Dados do usuário</h2>
                                    <div className="space-y-1 my-3">
                                                <p className="text-gray-700"><span className="font-semibold text-orange-400">Nome:</span> {user?.name}</p>
                                                <p className="text-gray-700"><span className="font-semibold text-orange-400">Email:</span> {user?.email}</p>
                                    </div>
                        </div>
            )
}