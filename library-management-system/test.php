<?php
// C:\xampp\htdocs\library-management-system\test.php
declare(strict_types=1);

// Al estar en la raíz, entramos a la subcarpeta 'classes' para cargar la base de datos
require_once __DIR__ . '/classes/Database.php';

echo "<div style='font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 8px;'>";
echo "<h2 style='color: #1e3a8a;'>🧪 Probando Conexión (library-management-system)</h2>";

try {
    // 1. Instanciar la clase Database
    $database = new Database();

    // 2. Ejecutar el método para obtener la conexión PDO
    $conexion = $database->getConnection();

    // 3. Validar la respuesta
    if ($conexion instanceof PDO) {
        echo "<p style='color: #2e7d32; font-weight: bold;'>✓ ¡Éxito! Conexión establecida correctamente con la base de datos 'biblioteca' en el puerto 3307.</p>";
        
        $version = $conexion->getAttribute(PDO::ATTR_SERVER_VERSION);
        echo "<small style='color: #666;'>Versión del motor MySQL: " . $version . "</small>";
    } else {
        echo "<p style='color: #c62828; font-weight: bold;'>❌ Error: El método no devolvió una instancia de PDO válida.</p>";
    }

} catch (Exception $e) {
    echo "<p style='color: #c62828; font-weight: bold;'>⚠️ Excepción capturada:</p> " . $e->getMessage();
}

echo "</div>";
