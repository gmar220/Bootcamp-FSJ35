<?php 

class Database{
    private $host = "localhost";
    private $port = "3307";
    private $db_name = "tienda_machetera"; // 
    private $username = "root";
    private $password = "";
    private PDO | null $connect;

    // Colocamos public explícitamente para cumplir con Clean Code y visibilidad estándar
    public function getConnection(){
        $this->connect = null;

        try {
            $dsn = "mysql:host=".$this->host.";port=".$this->port.";dbname=".$this->db_name.";charset=utf8mb4";
            
            // Agregamos opciones para que PDO lance excepciones si fallan las consultas futuras
            $this->connect = new PDO($dsn, $this->username, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            
        } catch (PDOException $error) {
            // Lanzamos el error hacia arriba. Así evitamos retornar null
            // y el controlador sabrá exactamente qué falló sin romper el Product.php
            throw new RuntimeException("Error crítico de conexión: " . $error->getMessage());
        }

        return $this->connect;
    }
}

?>