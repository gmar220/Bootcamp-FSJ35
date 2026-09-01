<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class UserController extends Controller
{
    //Registrar usuario

    public function register(Request $request){
        try{
        $user = $request->validate([
            'name' => 'required|string|max:100|min:5',
            'email' => 'required|string|email|max:200|unique:users',
            'password' => [
                'required',
                'string',
                Password::min(8)
                ->mixedCase() // mayus y minus
                ->numbers() // un numero
                ->symbols() // al menos un simbolo
            ]
        ]);
        
        // Hash = contra_123 -> askadjaskjdaksjdkasda

        User::create([
            'name' => $user['name'],
            'email' => $user['email'],
            'password' => Hash::make($user['password'])
        ]);

        return response()->json([
            'message' => 'User Created',
            'user' => $user
        ],201);
        } catch(\Exception $error){
            return response()->json(
                [
                    'message' => $error->getMessage()
                ]
            );
        }
    }

    public function login(Request $request){
    
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:8'
        ]);

        // Extraemos solo los datos que nos interesan de la peticion
        $credentials = $request->only('email','password');

        // Mira las credenciales, deshashea el password de la base de datos y mira si son iguales
        if( Auth::attempt($credentials) ) {
            // si las credenciales funcionaron

            $user = $request->user();

            //Crear el token unico para las peticiones

            $token = $user->createToken('auth_token')->plainTextToken;
        }

        return response()->json([
            'message' => 'User loged successfully',
            'user' => $user,
            'token' => $token,
            'type_token' => 'Bearer'
        ]);

    }
}
