<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContract;
use App\Http\Requests\UpdateContract;
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

    public function update(UpdateContract $request, Contract $contract)
    {
        $data = $request->validated();
        $authUserId = 1;

        $activeContract = $contract;

        $oldPlan = $activeContract->plan;

        $lastPayment = $activeContract->payment()
            ->whereNotNull('amount_paid')
            ->whereDate('due_date', '<=', Carbon::today())
            ->orderByDesc('due_date')
            ->first();

        $planId = $data["plan_id"];
        $newPlan = Plan::find($planId);

        $daysUsedPlan = Carbon::now()->diffInDays($lastPayment->due_date);
        $valueByDay = $lastPayment->amount_due / 30;

        $usageValue = $valueByDay * $daysUsedPlan;

        $balance = Payment::where("contract_id", $activeContract->id)
            ->where("due_date", ">=", Carbon::now()->subMonth(1))
            ->whereNotNull("amount_paid")
            ->sum("amount_paid");

        if ($balance > 0) {
            $balance -= $usageValue;
        }

        $newContract = DB::transaction(function () use ($authUserId, $planId, $newPlan, $oldPlan, $activeContract, $balance) {
            $isUpgrade = $oldPlan->price < $newPlan->price;

            $newContract = Contract::create([
                "plan_id" => $planId,
                "user_id" =>  $authUserId
            ]);

            $activeContract->update([
                "active" => false
            ]);
            // dd($newContract);
            if ($isUpgrade) {
                Payment::create([
                    "contract_id" => $newContract->id,
                    "method_payment" => "Saldo aplicado",
                    "category_payment" => "Assinatura",
                    "due_date" => Carbon::now(),
                    "date_payment" => Carbon::now(),
                    "amount_due" => $balance,
                    "amount_paid" => $balance,
                ]);
                if ($newPlan->price > $balance) {
                    Payment::create([
                        "contract_id" => $newContract->id,
                        "method_payment" => "Pix",
                        "category_payment" => "Assinatura",
                        "due_date" => Carbon::now(),
                        "date_payment" => Carbon::now(),
                        "amount_due" => (($newPlan->price) - $balance),
                    ]);
                }
                return $newContract;
            }

            Payment::create([
                "contract_id" => $newContract->id,
                "method_payment" => "Pix",
                "category_payment" => "Assinatura",
                "due_date" => Carbon::now(),
                "date_payment" => Carbon::now(),
                "amount_due" => $newPlan->price,
                "amount_paid" => $newPlan->price,
            ]);

            $balance = $balance - $newPlan->price;

            $meses  = 1;
            while ($balance > 0) {
                if ($balance >= $newPlan->price) {
                    Payment::create([
                        "contract_id" => $newContract->id,
                        "method_payment" => "Saldo aplicado",
                        "category_payment" => "Mensalidade",
                        "due_date" => Carbon::now()->addMonths($meses),
                        "date_payment" => Carbon::now(),
                        "amount_due" => $newPlan->price,
                        "amount_paid" => $newPlan->price,
                    ]);
                    $balance -= $newPlan->price;
                } else {
                    Payment::create([
                        "contract_id" => $newContract->id,
                        "method_payment" => "Saldo aplicado",
                        "category_payment" => "Mensalidade",
                        "due_date" => Carbon::now()->addMonths($meses),
                        "amount_due" => $balance,
                        "date_payment" => Carbon::now(),
                        "amount_paid" => $balance,
                    ]);
                    if ($newPlan->price > $balance) {
                        Payment::create([
                            "contract_id" => $newContract->id,
                            "method_payment" => "Pix",
                            "category_payment" => "Mensalidade",
                            "due_date" => Carbon::now()->addMonths($meses),
                            "amount_due" => (($newPlan->price) - $balance),
                        ]);
                    }
                    $balance -= $balance;
                }
                $meses += 1;
            }

            return $newContract;
        });
        $newContract = $newContract->fresh();
        return response()->json(new ContractResource($newContract));
    }
}
