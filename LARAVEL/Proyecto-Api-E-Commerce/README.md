# API RESTful de E-Commerce con Laravel 12 y Stripe

Esta es una API RESTful profesional diseñada como proyecto final para el Bootcamp. El sistema cuenta con autenticación por tokens mediante Laravel Sanctum, gestión de catálogo de productos, procesamiento de órdenes de compra con control de inventario y simulación integrada de la pasarela de pagos Stripe.

## 🚀 Tecnologías Utilizadas
- **Backend:** Laravel 12 & PHP 8.2
- **Base de Datos:** MySQL (XAMPP)
- **Autenticación:** Laravel Sanctum (Tokens Bearer)
- **Pasarela de Pagos:** SDK Oficial de Stripe
- **Documentación:** Swagger / OpenAPI 3.0

## 🛠️ Instrucciones de Instalación y Configuración

Siga estos pasos para desplegar el proyecto localmente en su entorno de desarrollo:

### 1. Clonar el repositorio
```bash
git clone <ENLACE_DE_TU_REPOSITORIO_AQUI>
cd Proyecto-Api-E-Commerce
```

### 2. Instalar las dependencias de Composer
```bash
composer install
```

### 3. Configurar las variables de entorno
Copie el archivo de ejemplo y configure sus credenciales locales (Base de datos y Stripe):
```bash
cp .env.example .env
```
*Nota: Genere la clave de la aplicación ejecutando:*
```bash
php artisan key:generate
```

### 4. Ejecutar las Migraciones y Seeders
Asegúrese de tener activo su servidor MySQL en XAMPP y ejecute los comandos para construir las tablas e inyectar el catálogo inicial de productos de prueba:
```bash
php artisan migrate
php artisan db:seed --class=ProductSeeder
```

### 5. Crear el enlace simbólico de almacenamiento
Para permitir el acceso público a la especificación JSON de la documentación, cree el puente de almacenamiento:
```bash
php artisan storage:link
```

### 6. Levantar el Servidor Local
Inicie el entorno HTTP local de Laravel:
```bash
php artisan serve
```

---

## 📌 Endpoints de la API y Documentación

La documentación interactiva completa con la especificación de todos los esquemas de datos y solicitudes se encuentra disponible en la siguiente ruta local con el servidor encendido:

🔗 **[http://localhost:8000/api/documentation](http://localhost:8000/api/documentation)**

### Resumen de Rutas Disponibles:
- `POST /api/register` - Registro de nuevos clientes.
- `POST /api/login` - Inicio de sesión y obtención del token Bearer.
- `GET /api/products` - Catálogo público de productos disponibles (Sustraído de MySQL).
- `POST /api/checkout` - Procesamiento de compras y cargos simulados mediante Stripe *(Ruta Protegida)*.
- `GET /api/my-history` - Consulta del historial de órdenes del cliente autenticado *(Ruta Protegida)*.
- `POST /api/products` - Creación de productos *(CRUD Administrativo Protegido)*.
- `PUT /api/products/{id}` - Edición de productos *(CRUD Administrativo Protegido)*.
- `DELETE /api/products/{id}` - Eliminación de productos *(CRUD Administrativo Protegido)*.
