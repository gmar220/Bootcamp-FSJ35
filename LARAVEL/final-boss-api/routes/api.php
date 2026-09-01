<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Endpoints PUBLICOS -> rutas que puede acceder cualquiera
//Son los que no necesitan token de autenticacion

Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);

Route::get('/posts',[PostController::class, 'index']);

//Endpoints Protegidos por sanctum
Route::middleware('auth:sanctum')->group( function(){

Route::post('/post',[PostController::class, 'store'])->middleware('auth:sanctum');

Route::put('/posts/{id}',[PostController::class, 'update']);

Route::delete('/posts/{id}', [PostController::class, 'destroy']);

Route::patch('/posts/{id}/restore', [PostController::class, 'restore']);

});