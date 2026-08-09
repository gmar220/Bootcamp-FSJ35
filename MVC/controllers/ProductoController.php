<?php 
    require_once __DIR__ . '/../repositories/mysql/Database.php';
    require_once __DIR__ . '/../models/Product.php';

class ProductController{
    private $productModel;

    public function __construct(){
        //Aca creo la base de datos para poner obtener el objeto inicial
        $database = new Database(); 

        //Crear la conexion con esa conexion ya puedo trabajar
        $db = $database->getConnection();

       $this->productModel = new Product($db);
    }

    public function read(){
      /* $products = [[
            'id'=>1,
            'nombre' => "Mouse",
            'cantidad' => 2,
            'descuento' => 5,
            'precio' => 150
        ]];*/
        $products = $this->productModel->getAll();
        /*
        print_r($products[0]);
        $unProducto = $products[0];
        print($unProducto['nombre']);
        print($products[2]['nombre']);*/
        include_once './views/home.php';
    }

    public function create(){
        if($_SERVER["REQUEST_METHOD"] === "POST"){
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $descuento = $_POST['descuento'];
            $cantidad = $_POST['cantidad'];

            $this->productModel->create($nombre, $precio, $descuento, $cantidad);
            header('Location: ./index.php?action=read');
            exit();
        }

        include_once './views/create.php';
    }

    public function update(){
        if (!isset($_GET['id']) || empty($_GET['id'])) {
            header('Location: ./index.php?action=read');
            exit();
        }

        $id = (int)$_GET['id'];
        $product = $this->productModel->getById($id);

        // MEJORA DE INTEGRIDAD: Cambiamos la validación del REQUEST_METHOD.
        // Si hay datos en el formulario (ya sea por el botón o por las cajas de texto), procesamos.
        if (isset($_POST['nombre']) || $_SERVER["REQUEST_METHOD"] === "POST") {
            
            $nombre = $_POST['nombre'];
            $precio = (float)$_POST['precio'];
            $descuento = (int)$_POST['descuento'];
            $cantidad = (int)$_POST['cantidad'];

            // Ejecutamos la actualización en tienda_machetera
            $this->productModel->update($id, $nombre, $precio, $descuento, $cantidad);
            
            // Redireccionamos al catálogo para refrescar la lista
            header('Location: ./index.php?action=read');
            exit();
        }

        include_once './views/edit.php';
    }

    // BOTÓN DELETE: Implementación de la acción de eliminación
    public function delete(){
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            
            // Invocamos el método delete en nuestro modelo
            $this->productModel->delete((int)$id);
        }

        // Redireccionamos de inmediato al home para ver la tabla actualizada sin el producto
        header('Location: ./index.php?action=read');
        exit();
    }
}

?>