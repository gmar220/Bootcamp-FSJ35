<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

use function Pest\Laravel\json;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //testeamos si anda el index
        // producto::all -> es un método que ya viene desde el modelo
        // este método va a ejecutar el select * from y viene desde Eloquent
        $productos = Producto::all();
        
        
        //echo "Fas tu Puedes";
        //return "Y puedes mas";
        /*retornar la respuesta de eloquent pero antes la vamos a parsear o
        transformar a objeto o json

        */
        return response()->json(
            [
                'data' => $productos
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //testear si llegan los datos
        //return $request->all();

        //Procesar los datos para poder guardarlos
        $producto = Producto::create($request->all());

        return response ( )->json(
            [
                'mensaje'=> 'Producto creado correctamente',
                'data' => $producto
            ],201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //buscamos un recurso en especifico 
        $producto = Producto::findOrFail($id);

        return response()->json(
            [
                'data' => $producto
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    
        // buscamos un recurso en específico 
        $producto = Producto::findOrFail($id);

        // actualizar un recurso 
        $producto->update::request->all();

        return response()->json(
            [
                'id' => $id,
                'data-request' => $request->all(),
                'data-response' => $producto
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //buscar el recurso a eliminar
        $producto = Producto::findOrFail($id);

        $producto->delete();

        return response()->json(
            [
                'mensaje' => 'Producto eliminado correctamente'
            ]
        );
    }
}
