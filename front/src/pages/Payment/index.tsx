import { Button } from '@/components/button';
import { Contract } from '@/type/contract';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function Payment() {
            const [isPaid, setIsPaid] = useState(false);
            const [isLoading, setIsLoading] = useState(false);
            const [contract, setContract] = useState<Contract>();
            const { userId } = useParams();

            const handlePayment = () => {
                        setIsLoading(true);
                        setTimeout(() => {
                                    setIsPaid(true);
                                    setIsLoading(false);
                        }, 2000);
            };

            const getContract = async () => {
                        try {
                                    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/contracts`);
                                    const json = await response.json();
                                    setContract(json.contract);
                        } catch {
                                    console.error("Falha ao carregar dados do usuário. Tente novamente.");
                        }
            }

            useEffect(() => {
                        getContract();
                        // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);

            const price = contract?.price.toString().replace(".", ",");


            return (
                        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                                                <h1 className="text-2xl font-bold text-center mb-6 text-orange-400">Pagamento via PIX</h1>

                                                {!isPaid ? (
                                                            <>
                                                                        <div className="mb-6">
                                                                                    <div className="flex justify-center mb-4">
                                                                                                <div className="border-2 border-dashed border-orange-500 p-4 rounded-lg">
                                                                                                            <div className="bg-gray-100 p-3 rounded">
                                                                                                                        <p className="font-mono text-center">002201.QRCODE.PIX.123321</p>
                                                                                                            </div>
                                                                                                </div>
                                                                                    </div>

                                                                                    <div className="space-y-3 mb-6">
                                                                                                <div className="flex justify-between">
                                                                                                            <span className="text-gray-600">Chave PIX:</span>
                                                                                                            <span className="font-medium">123.456.789-09</span>
                                                                                                </div>
                                                                                                <div className="flex justify-between">
                                                                                                            <span className="text-gray-600">Valor:</span>
                                                                                                            <span className="font-bold text-orange-400">R$ {price}</span>
                                                                                                </div>
                                                                                                <div className="flex justify-between">
                                                                                                            <span className="text-gray-600">Beneficiário:</span>
                                                                                                            <span>Inmediam</span>
                                                                                                </div>
                                                                                    </div>
                                                                        </div>

                                                                        <Button
                                                                                    onClick={handlePayment}
                                                                                    disabled={isLoading}
                                                                        >
                                                                                    {isLoading ? 'Processando...' : 'Confirmar Pagamento'}
                                                                        </Button>
                                                            </>
                                                ) : (
                                                            <div className="text-center py-8">
                                                                        <h2 className="text-xl font-bold mb-2">Pagamento Aprovado!</h2>
                                                                        <p className="text-gray-600">Pagamento realizado sucesso.</p>
                                                                        <p className="text-sm text-gray-500 my-4">Código de transação: PIX-123456789</p>
                                                                        <p className="text-sm text-gray-500 my-4">Para verificar as informações do contrato clique no botão abaixo...</p>
                                                                        <Link to={`/`}>
                                                                                    <Button>
                                                                                                Voltar para tela de usuário
                                                                                    </Button>
                                                                        </Link>
                                                            </div>

                                                )}
                                    </div>

                                    <div className="mt-6 text-center text-sm text-gray-500">
                                                <p>Não feche esta página até a confirmação do pagamento.</p>
                                    </div>
                        </div>
            );
}