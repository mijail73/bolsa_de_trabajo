<?php 
  /**
   * Autor: Victor Hugo Correa
   * Fecha de creación: 25/03/2021
   * Descripción: Funciones utilizadas en toda la aplicación
   */

  /**
   * Verifica si una variable está definida y contiene un valor distinto a nulo ó vacío
   * @param any value
   * @return boolean
   */
  function definido($value) {
    return (isset($value) && $value !== '');
  }
  /**
   * Verifica si llave está definida dentro de un array u objeto y si contiene un valor distinto a nulo ó vacío
   * @param any key
   * @param array array
   * @return boolean
   */
  function llaveDefinida($key, $array) {
    return array_key_exists($key, $array) && definido($array[$key]);
  }
  /**
   * Encripta un string usando Base64 y SHA256
   * @param string str
   * @return string
   */
  function encriptaString($str) {
    return hash('sha256', base64_encode($str));
  }
  /**
   * Valida si dos string encriptados en Base64 y SHA256 son iguales
   * @param string str1
   * @return string str2
   */
  function validaString($str1, $str2) {
    return $str1 === encriptaString($str2);
  }
  /**
   * Verifica si el header "BTKey" se encuentra dentro del arreglo de headers
   * @param array headers
   * @return boolean
   */
  function validaHeaders($headers) {
    if (llaveDefinida('BTKey', $headers)) {
      $token = $headers['BTKey'];
      return validaString($token, 'b0ls4D3Tr4b@j0T0K3N');
    }
    return false;
  }
  /**
   * Valida si existe un usuario con el query y variables proporcionados.
   * @param  BolsaDeTrabajoDB conexion
   * @param  string query
   * @param  string vars
   * @return array
   */
  function validaLogin ($conexion, $query, $vars) {
    $result = $conexion->prepare($query);
    $result->execute($vars);
    return $result->fetchAll(PDO::FETCH_ASSOC);
  }
  /**
   * Obtiene los datos de un alumno de la base de Sybase.
   * @param  CaeDB conexion
   * @param  string user
   * @return array
   */
  function obtieneDatosAlumno ($conexionCae, $user) {
    $query = 'SELECT AI.CUENTA, AI.NOMBRE, ADP.TELEFONO1, ADP.CELULAR, 
              CONVERT (CHAR(10), AI.FECHA_NACIMIENTO, 103) AS FECHA_NACIMIENTO, AI.EMAIL, E.AVANCE,
              C.NOMBRE AS CARRERA
              FROM ALUMNO_INTERNO AI
              LEFT JOIN ALUMNO_DAT_PER ADP ON AI.CUENTA = ADP.CUENTA
              LEFT JOIN ESTUDIA E ON AI.CUENTA = E.CUENTA
              LEFT JOIN (
                SELECT CLAVE, NOMBRE FROM CARRERAS WHERE VIGENCIA = ? AND PLN >= ?
              ) AS C ON C.CLAVE = E.CARRERA
              WHERE AI.CUENTA = ? ';
    $result = $conexionCae->prepare($query);    
    $result->execute(['S', '2005', $user]);
    return $result->fetchAll(PDO::FETCH_ASSOC);
  }
  /**
   * Guarda un alumno en la base de datos mysql
   * @param  BolsaDeTrabajoDB conexion
   * @param  string 
   * @return array
   */
  function guardaDatosAlumno ($conexionCae, $user) {
    $query = 'INSERT ';
    $result = $conexionCae->prepare($query);    
    $result->execute(['S', '2005', $user]);
    return $result->fetchAll(PDO::FETCH_ASSOC);
  }
?>





