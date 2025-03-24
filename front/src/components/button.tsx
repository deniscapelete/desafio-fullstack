import { ReactNode, ComponentProps } from "react";

interface ButtonProps extends ComponentProps<'button'> {
            children: ReactNode
}

export function Button(props: ButtonProps) {
            return (
                        <button className="bg-orange-500 rounded-md p-2 w-full font-semibold text-sm transition hover:opacity-[.80] text-white"
                                    {...props}
                        >
                                    {props.children}
                        </button>
            )
}