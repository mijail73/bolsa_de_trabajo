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
   * Valida si existe un usuario con las credenciales y tipo de usuario proporcionados.
   * @param  BolsaDeTrabajoDB conexion
   * @param  string user
   * @param  string pass
   * @param  string type
   * @return array
   */
  function validaLogin ($conexion, $user, $pass, $type) {
    switch ($type) {
      case 'admin':
        $result = $conexion->prepare('SELECT * FROM administrador WHERE user = ? AND pass = ?');
        break;
      case 'empleador':
        $result = $conexion->prepare('SELECT * FROM empleador WHERE correoEmpleador = ? AND passEmpleador = ?');
        break;
      case 'postulante':
        $field = strstr($user, '@') ? 'correo' : 'idPostulante';
        $result = $conexion->prepare("SELECT * FROM postulante WHERE {$field} = ? AND pass = ?");
        break;
      default:
        break;
    }
    $result->execute([$user, $pass]);
    return $result->fetchAll(PDO::FETCH_ASSOC);
  }
?>





