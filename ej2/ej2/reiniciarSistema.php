<?php
// Ruta del archivo JSON donde se almacenan los datos
$archivoJson = 'datosTurnero.json';

// Leer el archivo JSON para obtener los límites actuales
$datos = json_decode(file_get_contents($archivoJson), true);

// Mantener los límites actuales y vaciar los números generados
$datos['numeros'] = [];

// Guardar los datos actualizados en el archivo JSON
file_put_contents($archivoJson, json_encode($datos));

echo "Sistema reiniciado correctamente.";
?>
