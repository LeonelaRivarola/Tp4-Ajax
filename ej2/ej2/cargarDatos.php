<?php
// Ruta del archivo JSON donde se almacenan los datos
$archivoJson = 'datosTurnero.json';

// Verificar si el archivo existe
if (file_exists($archivoJson)) {
    // Leer el archivo JSON y decodificar los datos
    $datos = json_decode(file_get_contents($archivoJson), true);

    // Enviar los datos como respuesta en formato JSON
    echo json_encode($datos);
} else {
    // En caso de que el archivo no exista, enviar una respuesta vacía con valores predeterminados
    echo json_encode([
        'limiteInferior' => '',
        'limiteSuperior' => '',
        'numeros' => []
    ]);
}
?>
