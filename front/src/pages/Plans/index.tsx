import { Button } from "@/components/button";
import { CardPlan } from "@/components/cardPlan"
import { Plan } from "@/type/plan";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Plans = () => {

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectPlan, setSelectPlan] = useState<Plan | null>(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  const getPlans = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/plans`);
    const json = await response.json();
    setPlans(json);
  };
  useEffect(() => {
    getPlans();
  }, []);


  const handleSelectPlan = (id: number) => {
    setSelectPlan(plans.find(plan => plan.id === id) || null);
  }

  const handleDeselectPlan = () => {
    setSelectPlan(null);
  }

  const handleCreateContract = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/contracts`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          plan_id: selectPlan?.id
        })
      });
      const data = await response.json();
      console.log('Contrato criado:', data);
      navigate(`/pagamentos/${userId}`);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen p-2 bg-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {plans.map(item =>
          <button key={item.id}
            className="text-left hover:opacity-75"
            onClick={() => handleSelectPlan(item.id)}
          >
            <CardPlan plan={item} />
          </button>
        )}
      </div >
      {selectPlan &&
        <>
          <div className="fixed z-10 inset-0 bg-gray-400 opacity-70" onClick={handleDeselectPlan} />
          <div className="fixed top-1/3 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-xs p-5 space-y-4 shadow-lg">
              <p className="text-lg font-semibold text-center">Deseja contratar o plano <span className="font-bold">"{selectPlan.description}"</span>?</p>
              <div className="flex justify-between gap-3">
                <Button onClick={handleCreateContract}>Confirmar</Button>
                <Button onClick={handleDeselectPlan}>Cancelar</Button>
              </div>
            </div>
          </div>
        </>
      }




      {/* <form
        action={`${import.meta.env.VITE_API_URL}/users/${userId}/contracts`}
        method="POST"
        // Importante para o Laravel receber corretamente:
        encType="multipart/form-data"
      >
        <input
          type="hidden"
          name="plan_id"
          value={2}
        />

        <div className="form-group">
          <label htmlFor="payment_method">Método de Pagamento:</label>
          <select
            id="payment_method"
            name="payment_method"
            required
            defaultValue="pix"
          >
            <option value="pix">PIX</option>
            <option value="credit_card">Cartão de Crédito</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Confirmar Pagamento
        </button>
      </form> */}





    </div >



  )
}