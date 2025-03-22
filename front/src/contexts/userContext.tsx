import { User } from "@/type/user";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type UserContextProvider = {
            user: User | undefined,
}

export const UserContext = createContext<UserContextProvider | null>(null)

export function UserContextProvider({ children }: { children: ReactNode }) {
            const [user, setUser] = useState<User>();

            const getUser = async () => {
                        try {
                                    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`);
                                    const json = await response.json();
                                    setUser(json);
                        } catch {
                                    console.error("Falha ao carregar dados do usuário.");
                        }
            }

            useEffect(() => {
                        getUser();
            }, []);

            return (
                        <UserContext.Provider value={{ user }}>
                                    {children}
                        </UserContext.Provider>
            );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);
