<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContractController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    return response()->json(['message' => 'ok']);
});

Route::apiResource('plans', PlanController::class, ['only' => 'index']);

Route::apiSingleton('user', UserController::class, ['only' => 'show']);

Route::post('users/{user}/contracts', [ContractController::class, 'store']);
Route::get('users/{user}/contracts', [ContractController::class, 'show']);