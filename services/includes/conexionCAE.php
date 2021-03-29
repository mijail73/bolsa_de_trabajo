<?php 
    class CaeDB {
        private $host = '132.248.103.101:5000';
        private $dbname = 'saae_fq';
        private $username = 'planeacion';
        private $password = 'conpla2010';
        private $conexion;
     
        public function connect() {
            try {
                $this->conexion = new PDO("dblib:host={$this->host};dbname={$this->dbname};charset=utf8", $this->username, $this->password);
                $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $this->conexion;
            } catch (Exception $e) {
                echo 'Error en la conexión: ' . $e->getMessage();
                return false;
            }
        }
    }
?>