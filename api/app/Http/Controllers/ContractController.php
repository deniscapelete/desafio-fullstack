<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function store(Request $request, User $user)
        {        
            // a fazer antes de desativar os contrato verificar se possui algum outro ativo e qual foi a data de pagamento e valor para fazer a compensação no pagamento se necessário.
            // a fazer, ativar contrato após confirmação do pix, atualizar informações de pagamento e inserir o valor do proximo mes para pagamento
            $validated = $request->validate([
                'plan_id' => 'required|exists:plans,id'
            ]);
            $plan = Plan::findOrFail($validated['plan_id']);
    
            $user->contracts()->where('active', true)->update(['active' => false]);
           
            $contract = $user->contracts()->create([
                'plan_id' => $plan->id,
                'price' => $plan->price,          
            ]); 
    
            $payment = $contract->payments()->create([
                'amount' => $plan->price,
                'is_paid' => false,            
            ]);
    
            return response()->json(['contract' => $contract, 'payment' => $payment], 201);
        }


        public function show(User $user)
        {
            $contract = $user->contracts()
                ->with('plan') // Garante que o plano virá junto
                ->latest('created_at')
                ->first();
        
            if (!$contract) {
                return response()->json(['message' => 'Nenhum contrato encontrado'], 404);
            }
        
            // Retorna tudo em uma única resposta
            return response()->json([
                'contract' => $contract,              
            ]);
        }
}
