<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * Display the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return User::find(1);
    }

    public function storeContract(Request $request, User $user, Plan $plan)
    {        
        $contract = $user->contracts()->create([
            'plan_id' => $plan->id,
            'price' => $plan->price,          
        ]); 
        return response()->json(['contract' => $contract], 201);
    }
}
