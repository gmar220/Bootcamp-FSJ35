<?php

use App\Http\Controllers\Api\EcomController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// ==========================================
// RUTAS PÚBLICAS (No requieren Token)
// ==========================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [EcomController::class, 'indexProducts']);

// ==========================================
// RUTAS PROTEGIDAS (Exigen Bearer Token)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {
    
    // Procesar la compra con Stripe
    Route::post('/checkout', [EcomController::class, 'checkout']);
    
    // Consultar historial del cliente
    Route::get('/my-history', [EcomController::class, 'myHistory']);
    
    // CRUD Administrativo de Productos
    Route::post('/products', [EcomController::class, 'storeProduct']);
    Route::put('/products/{id}', [EcomController::class, 'updateProduct']);
    Route::delete('/products/{id}', [EcomController::class, 'destroyProduct']);
    
});
