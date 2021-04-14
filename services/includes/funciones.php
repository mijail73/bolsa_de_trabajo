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
   * Genera un id único de 9 dígitos
   * @param string n
   * @param string aP
   * @param string aM
   * @param string f
   * @return array
   */
  function generaIdUsuario ($n, $aP, $aM, $f) {
    $fa = explode('-', $f);
    return substr($aP, 0, 1) . substr($aM, 0, 1) . substr($n, 0, 1) . substr($fa[0], 1, 2) . $fa[1] . $fa[2];
  }
  /**
   * Registra a un postulante en la base de datos 
   * @param  BolsaDeTrabajoDB conexion
   * @param  data
   */
  function registraPostulante ($conexion, $d) {
    $query = 'INSERT INTO postulante (idPostulante, nombre, correo, telefono, fechaNacimiento, sexo, estado, universidad,
    facultad, carrera, situacionAcademica, semestre, situacionLaboral, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    $result = $conexion->prepare($query);    
    $result->execute([
      generaIdUsuario($d['nombre'], $d['apPaterno'], $d['apMaterno'], $d['fechaNacimiento']),
      $d['apPaterno'] . ' ' . $d['apMaterno'] . ' ' . $d['nombre'],
      $d['correo'],
      $d['telefono'],
      $d['fechaNacimiento'],
      $d['sexo'],
      $d['estado'],
      $d['universidad'],
      $d['facultad'],
      $d['carrera'],
      $d['situacionAcademica'],
      $d['semestre'],
      $d['situacionLaboral'],
      $d['tipo'],
    ]);
  }
    /**
   * Genera un id único de 9 dígitos
   * @param string n
   * @param string c
   * @param string p 
   * @return array
   */
  function generaIdEmpleador ($n, $c) {
    $na = explode(' ', $n);
    return substr($na[0], 0, 3) . substr($na[1], 0, 3) . substr($c, 0, 3);
  }
    /**
   * Incribe a un empleador en la base de datos 
   * @param  BolsaDeTrabajoDB conexion
   * @param  data
   */
  function inscribeEmpleador ($conexion, $d) {
    $query = 'INSERT INTO empleador (idEmpleador, nombreEmpleador, correoEmpleador, puestoEmpleador, telefonoEmpleador, extEmpleador, celularEmpleador, nombreEmpresa,
    direccionEmpresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    $result = $conexion->prepare($query);    
    $idEmpleador = generaIdEmpleador($d['nombre'], $d['correo']);
    $result->execute([
      $idEmpleador,
      $d['nombre'],
      $d['correo'],
      $d['puesto'],
      $d['telOficina'],
      $d['extension'],
      $d['celular'],
      $d['empresa'],
      $d['dirOficinaCentral'],
    ]);
  }

  /*include_once("conexion.php");
  $bolsaDB = new BolsaDeTrabajoDB();
  $conexion = $bolsaDB->connect();
  $dat = '{"nombre":"Martin Carmona","correo":"hola@com.com","puesto":"Supervisor","telOficina":1234567899,"extension":12345,"celular":1234123412,"empresa":"jumex","dirOficinaCentral":"otilio montaño"}';
  $d= json_decode($dat, true);
  inscribeEmpleador($conexion, $d);
  echo generaIdEmpleador("Martin Carmona", "mcarmonam@cienicas.unam.mx");*/
?>





