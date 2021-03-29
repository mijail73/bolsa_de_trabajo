<?php 
  /**
   * Autor: Victor Hugo Correa
   * Fecha de creación: 25/03/2021
   * Descripción: Servicio que autentica el login de los diferentes usuarios de acuerdo a un tipo
   */

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");

  include('includes/conexion.php');
  include('includes/conexionCAE.php');
  include('includes/funciones.php');
  $response = array();  
  $response['replyCode'] = 200;
  $response['replyText'] = 'Autenticación exitosa';
  $response['data'] = [];

  if (validaHeaders(getallheaders())) {
    if (llaveDefinida('data', $_POST)) {
      $data = json_decode($_POST['data'], true);
      if (llaveDefinida('user', $data) && llaveDefinida('pass', $data) && llaveDefinida('type', $data)) {
        $user = $data['user'];
        $pass = $data['pass'];
        $type = $data['type'];
        $bolsaDeTrabajo = new BolsaDeTrabajoDB();
        $conexion = $bolsaDeTrabajo->connect();
        try {
          switch ($type) {
            case 'admin':
              $query = 'SELECT * FROM administrador WHERE user = ? AND pass = ?';
              $response['data'] = validaLogin($conexion, $query, [$user, $pass]);
              break;
            case 'empleador':
              $query = 'SELECT * FROM empleador WHERE correoEmpleador = ? AND passEmpleador = ?';
              $response['data'] = validaLogin($conexion, $query, [$user, $pass]);
              break;
            case 'postulante':
              if (strstr($user, '@')) { // Externos
                $query = 'SELECT * FROM postulante WHERE correo = ? ';
                $response['data'] = validaLogin($conexion, $query, [$user]);
              } else { // Alumno interno
                $query = 'SELECT * FROM postulante WHERE idPostulante = ? ';
                $response['data'] = validaLogin($conexion, $query, [$user]);
                // if (count($response['data']) === 0) { // Se verifica en Sybase si existe el alumno
                //   $cae = new CaeDB();
                //   $conexionCae = $cae->connect();
                //   $response['data'] = obtieneDatosAlumno($conexionCae, $user);
                // } 
              }
              break;
            default:
              break;
          }
          if (count($response['data']) === 0) { 
            $response['replyText'] = $type !== 'postulante' ? 'Usuario o contraseña incorrectos' : 'Usuario no encontrado';
          }
        } catch (Exception $e) {
          $response['replyCode'] = 400;
          $response['replyText'] = 'Error: ' . $e->getMessage();
          unset($response['data']);
        }
      } else {
        $response['replyCode'] = 400;
        $response['replyText'] = 'Bad request';
        unset($response['data']);
      }
    }
  } else {
    $response['replyCode'] = 401;
    $response['replyText'] = 'Unauthorized';
    unset($response['data']);
  }
  // // http_response_code($response['replyCode']);
  echo json_encode($response);
  exit();
?>