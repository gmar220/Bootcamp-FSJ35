<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // SOLUCIÓN: Permitimos la asignación masiva de estos campos críticos
    protected $fillable = [
        'user_id',
        'total_amount',
        'status',
    ];

    /**
     * Relación con los ítems de la orden (detalles)
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class); // o el nombre que le diste a tu modelo de ítems
    }
}
