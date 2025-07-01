<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContract;
use App\Http\Resources\ContractResource;
use App\Models\Contract;
use App\Models\Payment;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ContractController extends Controller
{
    public function index()
    {
        $authUserId = 1;
        $activeContract = Contract::where('user_id', $authUserId)
            ->where('active', true)
            ->get()
            ->last();

        if (!$activeContract) {
            return response()->json(["message" => "Nenhum contrato ativo encontrado"], 404);
        }

        return response()->json(new ContractResource($activeContract));
    }

    public function store(StoreContract $request)
    {
        $data = $request->validated();
        $authUserId = 1;
        $plan = Plan::find($data['plan_id']);

        if (!$plan) {
            return response()->json(["message" => "Plano não encontrado"], 404);
        }
        // dd($plan);
        $contract = DB::transaction(function () use ($data, $authUserId, $plan) {
            $contract = Contract::create([
                "plan_id" => $data["plan_id"],
                "user_id" =>  $authUserId
            ]);

            Payment::create([
                "contract_id" => $contract->id,
                "method_payment" => "Pix",
                "category_payment" => "Assinatura",
                "due_date" => Carbon::now(),
                "date_payment" => Carbon::now(),
                "amount_due" => $plan->price,
                "amount_paid" => $plan->price,
            ]);

            return $contract = Contract::with('payment')->find($contract->id);
        });

        return response()->json(new ContractResource($contract));
    }
}
