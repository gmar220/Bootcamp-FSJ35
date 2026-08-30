<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA; // <-- IMPORTANTE: Ahora usamos Attributes en lugar de Annotations

// ATRIBUTOS MODERNOS DE PHP 8 (Sin usar comentarios tradicionales)
#[OA\Info(
    version: "1.0.0",
    title: "API Segura de E-commerce - Laravel 12",
    description: "Documentación oficial OpenAPI de servicios comerciales críticos con pasarela Stripe"
)]
#[OA\SecurityScheme(
    securityScheme: "bearerAuth",
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
)]
abstract class Controller
{
    // Dejar la estructura limpia de Laravel aquí adentro
}
