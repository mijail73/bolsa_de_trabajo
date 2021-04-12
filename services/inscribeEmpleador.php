<?php

/**
 * Autor: Martín Carmona
 * Fecha de creación: 12/04/2021
 * Descripción: Servicio encargado de inscribir a un empleador
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include('includes/conexion.php');
include('includes/funciones.php');

$response = array();
$response['replyCode'] = 200;
$response['replyText'] = 'Inscripción exitosa exitoso';
$response['data'] = [];

if (validaHeaders(getallheaders())) {
  if (llaveDefinida('data', $_POST)) {
    $data = json_decode($_POST['data'], true);
    if (
      llaveDefinida('nombre', $data) && llaveDefinida('correo', $data) &&
      llaveDefinida('puesto', $data)   && llaveDefinida('telOficina', $data) && llaveDefinida('extension', $data) && llaveDefinida('celular', $data) && llaveDefinida('empresa', $data) && llaveDefinida('dirOficinaCentral', $data)
    ) {
      $bolsaDeTrabajo = new BolsaDeTrabajoDB();
      $conexion = $bolsaDeTrabajo->connect();
      try {
        $conexion->beginTransaction();
        inscribeEmpleador($conexion, $data);
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
echo json_encode($response);
exit();
?>
