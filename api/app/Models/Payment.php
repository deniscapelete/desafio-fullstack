<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'contract_id',
        'due_date',
        'method_payment',
        'category_payment',
        'date_payment',
        'amount_due',
        'amount_paid'
    ];
    protected $casts = [
        'amount_due' => 'float',
        'amount_paid' => 'float',
    ];

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }
}
