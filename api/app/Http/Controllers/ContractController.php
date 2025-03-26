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
}
