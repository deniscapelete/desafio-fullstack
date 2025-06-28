<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlanResource extends JsonResource
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
            'description' => $this->description,
            'numberOfClients' => $this->numberOfClients,
            'gigabytesStorage' => $this->gigabytesStorage,
            'price' => $this->price,
            'active' => $this->active,
            'created_at' => $this->created_at,
            'updated_at' => $this->created_at
        ];
    }
}
