<?php
// Ruta del archivo JSON donde se almacenan los datos
$archivoJson = 'datosTurnero.json';

// Leer el archivo JSON
$datos = json_decode(file_get_contents($archivoJson), true);

$limiteInferior = $datos['limiteInferior'];
$limiteSuperior = $datos['limiteSuperior'];
$numerosGenerados = $datos['numeros'];

// Función para generar un número aleatorio no repetido
function generarNumeroAleatorio($limiteInferior, $limiteSuperior, $numerosGenerados) {
    $numerosPosibles = range($limiteInferior, $limiteSuperior);
    $numerosDisponibles = array_diff($numerosPosibles, $numerosGenerados);

    if (count($numerosDisponibles) == 0) {
        return ['error' => 'Todos los números han sido generados.'];
    }

    $numeroAleatorio = $numerosDisponibles[array_rand($numerosDisponibles)];
    return ['numero' => $numeroAleatorio];
}

// Generar el número aleatorio
$resultado = generarNumeroAleatorio($limiteInferior, $limiteSuperior, $numerosGenerados);

if (!isset($resultado['error'])) {
    // Agregar el número generado a la lista de números
    $datos['numeros'][] = $resultado['numero'];
    file_put_contents($archivoJson, json_encode($datos));
}

// Devolver el resultado en formato JSON
echo json_encode($resultado);
?>
