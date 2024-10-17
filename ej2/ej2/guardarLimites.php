<?php
// Ruta del archivo JSON donde se almacenarán los datos
$archivoJson = 'datosTurnero.json';

// Obtener los límites enviados por el usuario
$limiteInferior = $_POST['limiteInferior'];
$limiteSuperior = $_POST['limiteSuperior'];

// Crear el array de datos con los límites
$datos = array(
    "limiteInferior" => $limiteInferior,
    "limiteSuperior" => $limiteSuperior,
    "numeros" => [] // Inicialmente vacío
);

// Guardar los datos en el archivo JSON
file_put_contents($archivoJson, json_encode($datos));

echo "Límites guardados correctamente.";
?>
