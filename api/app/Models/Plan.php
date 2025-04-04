<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'description',
        'numberOfClients',
        'price',
        'gigabytesStorage',
    ]; 

    public function contracts()
        {
            return $this->hasMany(Contract::class);
        }
}
