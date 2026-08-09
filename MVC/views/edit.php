<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Producto</title>
    <link href="https://jsdelivr.net" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>
<body>
    <?php include './views/layouts/navbar.php'?>
    
    <main class="container mt-2"> 
        <h2 class="text-center">Editar producto</h2>
        <section class="d-flex justify-content-center">
            <article class="card col-8 p-3">
                
                <!-- CORRECCIÓN CLAVE: Se inyecta el ID del producto en la URL del action -->
                <form class="form-control" action="./index.php?action=update&id=<?php echo $product['id']; ?>" method="POST">
                    
                    <label class="form-label" for="nombre">Nombre</label>
                    <input class='form-control' type="text" id="nombre" name="nombre" value="<?php echo $product['nombre']; ?>" required>
                    
                    <label class="form-label" for="precio">Precio</label>
                    <input class='form-control' type="number" step="0.01" id="precio" name="precio" value="<?php echo $product['precio']; ?>" required>
                    
                    <label class="form-label" for="descuento">Descuento</label>
                    <input class='form-control' type="text" id="descuento" name="descuento" value="<?php echo $product['descuento']; ?>" required>
                    
                    <label class="form-label" for="cantidad">Cantidad</label>
                    <input class="form-control" id="cantidad" name="cantidad" value="<?php echo $product['cantidad']; ?>" required>
                    
                    <!-- Dejamos un solo botón unificado con la acción submit -->
                    <button class="btn btn-success mt-3 w-100" type="submit">Guardar Cambios</button>
                </form>
                
            </article>
        </section>
    </main>

</body>
</html>
