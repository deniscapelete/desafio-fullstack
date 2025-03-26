<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\User;
use App\Models\Contract;
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
}
