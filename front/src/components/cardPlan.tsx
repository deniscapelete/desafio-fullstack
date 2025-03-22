import { Plan } from "@/type/plan";

export function CardPlan({ plan }: { plan: Plan }) {
            const description = plan.description.split("/");
            const price = plan.price.toString().replace(".", ",")

            return (
                        <div className="w-[360px] rounded-xl bg-white space-y-5 py-5 text-gray-700 shadow-md shadow-gray-300">
                                    <div className="bg-orange-500 w-[310px] h-[72px] px-5 py-2 text-white content-center">
                                                <p className="font-bold text-xl">{description[0]}</p>
                                                {(description.length > 1) &&
                                                            <p className="font-semibold text-lg">{`/ ${description[1]}`}</p>
                                                }
                                    </div>
                                    <div className="px-5">
                                                <p className="font-semibold text-xl">Preço:</p>
                                                <p className="text-3xl font-bold">R$ {price} <span className="font-normal text-xl">/mês</span></p>
                                    </div>
                                    <div className="px-5 pb-5">
                                                <p className="text-xl">Armazenamento:</p>
                                                <p className="text-3xl font-bold">{plan.gigabytesStorage} GB</p>
                                    </div>
                        </div>
            )
}