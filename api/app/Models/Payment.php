<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [        
        'contract_id',
        'amount',
        'is_paid',
        'payment_date',
    ]; 

}
