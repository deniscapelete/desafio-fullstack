<?php

namespace App\Models;

use App\Models\Contract;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $hidden = ['created_at', 'updated_at'];

    public function contracts(){
        return $this->hasMany(Contract::class);
    }   

}
