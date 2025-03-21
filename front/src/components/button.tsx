import { ReactNode } from "react";

export function Button({ children }: { children: ReactNode }) {
            return (
                        <button className="bg-orange-500 rounded-md p-2 w-full font-semibold text-sm transition hover:opacity-[.80] text-white">
                                    {children}
                        </button>
            )
}