<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlanResource;
use App\Models\Plan;

class PlanController extends Controller
{
    /**
     * Display a listing of the plans.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $plans = Plan::all();
        return response()->json(PlanResource::collection($plans));
    }
}
