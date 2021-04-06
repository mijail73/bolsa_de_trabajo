<?php 
  /**
   * Autor: Victor Hugo Correa
   * Fecha de creación: 01/04/2021
   * Descripción: Servicio encargado de registrar a un nuevo postulante externo
  */

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");

  include('includes/conexion.php');
  include('includes/funciones.php');

  $response = array();  
  $response['replyCode'] = 200;
  $response['replyText'] = 'Registro exitoso';
  $response['data'] = [];

  if (validaHeaders(getallheaders())) {
    if (llaveDefinida('data', $_POST)) {
      $data = json_decode($_POST['data'], true);
      if (llaveDefinida('nombre', $data) && llaveDefinida('apPaterno', $data) && llaveDefinida('apMaterno', $data) && 
      llaveDefinida('fechaNacimiento', $data) && llaveDefinida('sexo', $data) && llaveDefinida('estado', $data) && 
      llaveDefinida('universidad', $data) && llaveDefinida('facultad', $data) && llaveDefinida('carrera', $data) && 
      llaveDefinida('correo', $data) && llaveDefinida('situacionAcademica', $data) && llaveDefinida('semestre', $data) &&
      llaveDefinida('situacionLaboral', $data)) {
        
        $bolsaDeTrabajo = new BolsaDeTrabajoDB();
        $conexion = $bolsaDeTrabajo->connect();
        try {
          $conexion->beginTransaction();
          registraPostulante($conexion, $data);
          $conexion->commit();
        } catch (Exception $e) {
          if ($conexion->inTransaction()) $conexion->rollBack();
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