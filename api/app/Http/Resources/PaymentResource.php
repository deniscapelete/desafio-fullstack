<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'contract_id' => $this->contract_id,
            'due_date' => Carbon::parse($this->due_date)->format('d-m-Y'),
            'amount_due' => $this->amount_due,
            'method_payment' => $this->method_payment,
            'category_payment' => $this->category_payment,
            'date_payment' => Carbon::parse($this->date_payment)->format('d-m-Y'),
            'amount_paid' => $this->amount_paid,
        ];
    }
}
