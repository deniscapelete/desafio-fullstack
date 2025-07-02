<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentResource;
use App\Models\Payment;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::whereHas('contract', function ($query) {
            $query->where('user_id', 1);
        })->get();

        return response()->json(PaymentResource::collection($payments));
    }
}
