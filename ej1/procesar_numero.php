<?php
session_start();

//si no existe en numero en la sesion
if (!isset($_SESSION['numeroSecreto'])) {
    $_SESSION['numeroSecreto'] = rand(1, 1000);
    $_SESSION['intentos'] = 0; // Reinicia los intentos
}

//proceso la solicitud ajax
if (isset($_POST['numero'])) {
    $numeroUsuario = intval($_POST['numero']);
    $_SESSION['intentos']++; // Incrementa el contador de intentos
    $numeroSecreto = $_SESSION['numeroSecreto'];

    $mensaje = '';
    if ($numeroUsuario < $numeroSecreto) {
        $mensaje = 'El número es más grande.';
    } elseif ($numeroUsuario > $numeroSecreto) {
        $mensaje = 'El número es más pequeño.';
    } else {
        $mensaje = '¡Felicidades! Adivinaste el número secreto.';
        // Reinicia la partida
        $_SESSION['mejorPuntaje'] = isset($_SESSION['mejorPuntaje']) ? min($_SESSION['mejorPuntaje'], $_SESSION['intentos']) : $_SESSION['intentos'];
        $_SESSION['partidasFinalizadas'] = isset($_SESSION['partidasFinalizadas']) ? $_SESSION['partidasFinalizadas'] + 1 : 1;
        $_SESSION['promedioIntentos'] = ($_SESSION['promedioIntentos'] * ($_SESSION['partidasFinalizadas'] - 1) + $_SESSION['intentos']) / $_SESSION['partidasFinalizadas'];
        $_SESSION['numeroSecreto'] = rand(1, 1000); // Genera un nuevo número secreto para la siguiente partida
        $_SESSION['intentos'] = 0; // Reinicia los intentos
    }

// Devolver el resultado en formato JSON
echo json_encode([
    'mensaje' => $mensaje,
    'intentos' => $_SESSION['intentos'],
    'mejorPuntaje' => $_SESSION['mejorPuntaje'] ?? '-',
    'partidasFinalizadas' => $_SESSION['partidasFinalizadas'] ?? 0,
    'promedioIntentos' => round($_SESSION['promedioIntentos'] ?? 0, 2)
]);
} else {
echo json_encode(['mensaje' => 'No se envió ningún número.']);
}
?>
