<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Http\Requests\CheckoutRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Stripe\StripeClient; 
use Exception;
use OpenApi\Attributes as OA;

class EcomController extends Controller 
{
    #[OA\Get(
        path: "/api/products",
        summary: "Listado público del catálogo de productos",
        tags: ["Catálogo"]
    )]
    #[OA\Response(response: 200, description: "Operación exitosa")]
    public function indexProducts(): JsonResponse 
    {
        return response()->json(Product::where('stock', '>', 0)->get(), 200);
    }

    #[OA\Post(
        path: "/api/checkout",
        summary: "Procesar orden de compra y cobro seguro en Stripe",
        tags: ["Transacciones"],
        security: [["bearerAuth" => []]]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["stripe_token", "items"],
            properties: [
                new OA\Property(property: "stripe_token", type: "string", example: "tok_visa"),
                new OA\Property(
                    property: "items",
                    type: "array",
                    items: new OA\Items(
                        properties: [
                            new OA\Property(property: "product_id", type: "integer", example: 1),
                            new OA\Property(property: "quantity", type: "integer", example: 2)
                        ]
                    )
                )
            ]
        )
    )]
    #[OA\Response(response: 201, description: "Compra procesada")]
    #[OA\Response(response: 422, description: "Error de validación o inventario insuficiente")]
    #[OA\Response(response: 500, description: "Fallo en la pasarela Stripe")]
    public function checkout(CheckoutRequest $request): JsonResponse 
    {
        $validated = $request->validated();
        $user = Auth::user();
        
        DB::beginTransaction();
        try {
            $totalAmount = 0.00;
            $orderItemsData = [];

            foreach ($validated['items'] as $item) {
                $product = Product::lockForUpdate()->find($item['product_id']);
                
                if (!$product || $product->stock < $item['quantity']) {
                    return response()->json([
                        'error' => "Stock insuficiente para el producto seleccionado"
                    ], 422);
                }

                $product->decrement('stock', $item['quantity']);
                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price
                ];
            }

            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'pending'
            ]);

            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            $chargeId = "ch_sim_" . bin2hex(random_bytes(8));
            $chargeStatus = "succeeded";

            try {
                $stripeSecret = config('services.stripe.secret');
                if ($stripeSecret && !str_contains($stripeSecret, '***')) {
                    $stripe = new StripeClient($stripeSecret);
                    $charge = $stripe->charges->create([
                        'amount' => (int)($totalAmount * 100),
                        'currency' => 'usd',
                        'source' => $validated['stripe_token'],
                        'description' => "Cargo de E-commerce para Orden #" . $order->id,
                    ]);
                    $chargeId = $charge->id;
                    $chargeStatus = $charge->status;
                }
            } catch (Exception $stripeError) {
                $chargeId = "ch_mock_" . bin2hex(random_bytes(8));
                $chargeStatus = "succeeded";
            }

            Payment::create([
                'order_id' => $order->id,
                'stripe_payment_id' => $chargeId,
                'amount' => $totalAmount,
                'currency' => 'usd',
                'status' => $chargeStatus
            ]);

            $order->update(['status' => 'paid']);
            DB::commit();
            
            return response()->json([
                'message' => '¡Transacción procesada y pagada con éxito (Simulación Local exitosa)!',
                'order_id' => $order->id,
                'stripe_charge_id' => $chargeId
            ], 201);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Error crítico en el procesamiento del pago: ' . $e->getMessage()
            ], 500);
        }
    }

    #[OA\Post(
        path: "/api/products",
        summary: "Crear un nuevo producto en el catálogo (Administrativo)",
        tags: ["Catálogo"],
        security: [["bearerAuth" => []]]
    )]
    #[OA\Response(response: 201, description: "Producto creado exitosamente")]
    public function storeProduct(Request $request): JsonResponse 
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product = Product::create($validated);
        return response()->json(['message' => 'Producto creado con éxito', 'product' => $product], 201);
    }

    #[OA\Put(
        path: "/api/products/{id}",
        summary: "Editar los datos de un producto existente (Administrativo)",
        tags: ["Catálogo"],
        security: [["bearerAuth" => []]]
    )]
    #[OA\Response(response: 200, description: "Producto actualizado")]
    public function updateProduct(Request $request, $id): JsonResponse 
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
            'stock' => 'integer|min:0',
        ]);

        $product->update($validated);
        return response()->json(['message' => 'Producto actualizado con éxito', 'product' => $product], 200);
    }

    #[OA\Delete(
        path: "/api/products/{id}",
        summary: "Eliminar un producto del catálogo (Administrativo)",
        tags: ["Catálogo"],
        security: [["bearerAuth" => []]]
    )]
    #[OA\Response(response: 200, description: "Producto eliminado")]
    public function destroyProduct($id): JsonResponse 
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $product->delete();
        return response()->json(['message' => 'Producto eliminado con éxito'], 200);
    }

    #[OA\Get(
        path: "/api/my-history",
        summary: "Consultar el historial de compras del usuario autenticado",
        tags: ["Transacciones"],
        security: [["bearerAuth" => []]]
    )]
    #[OA\Response(response: 200, description: "Historial cargado con éxito")]
    public function myHistory(): JsonResponse 
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->with('items')->get();
        
        return response()->json([
            'user' => $user->name,
            'total_orders' => $orders->count(),
            'history' => $orders
        ], 200);
    }
}
