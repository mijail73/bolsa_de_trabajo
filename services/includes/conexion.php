<?php 
    class BolsaDeTrabajoDB {
        private $host = 'localhost';
        private $dbname = 'bolsadetrabajo_db';
        private $username = 'bolsadetrabajo';
        private $password = 'b0ls4Tr4b@j0';
        private $conexion;
     
        public function connect() {
            try {
                $this->conexion = new PDO("mysql:host={$this->host};dbname={$this->dbname};charset=utf8", $this->username, $this->password);
                $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $this->conexion;
            } catch (Exception $e) {
                echo 'Error en la conexión: ' . $e->getMessage();
                return false;
            }
        }
    }
?>