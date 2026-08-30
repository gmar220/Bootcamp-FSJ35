<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    // SOLUCIÓN: Habilitamos la asignación masiva para guardar el registro de pago
    protected $fillable = [
        'order_id',
        'stripe_payment_id',
        'amount',
        'currency',
        'status',
    ];
}
