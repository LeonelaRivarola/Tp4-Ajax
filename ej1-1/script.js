$(document).ready(function () {
    let gameState = {
        numeroSecreto: Math.floor(Math.random() * 1000) + 1,
        intentos: 0,
        mejorPuntaje: Infinity,
        partidasFinalizadas: 0,
        sumaIntentos: 0
    };

    $('#boton').click(function () {
        let numero = $('#numero').val(); // Obtenemos el número ingresado por el usuario
        gameState.intentos++; // Incrementamos los intentos

        // Comparamos el número ingresado con el número secreto
        let mensaje = '';
        if (numero < gameState.numeroSecreto) {
            mensaje = 'El número es más grande.';
        } else if (numero > gameState.numeroSecreto) {
            mensaje = 'El número es más pequeño.';
        } else {
            mensaje = '¡Felicidades! Adivinaste el número secreto.';

            // Verifico si es el mejor puntaje
            if (gameState.intentos < gameState.mejorPuntaje) {
                gameState.mejorPuntaje = gameState.intentos;
                $('#mejor-puntaje').text(`Mejor Puntaje: ${gameState.mejorPuntaje} intento(s)`);
            }

            // Se actualiza el contador de partidas y la suma
            gameState.partidasFinalizadas++;
            gameState.sumaIntentos += gameState.intentos;
            let promedio = (gameState.sumaIntentos / gameState.partidasFinalizadas).toFixed(2);

            $('#partidas-finalizadas').text(`Partidas Finalizadas: ${gameState.partidasFinalizadas}`);
            $('#promedio-intentos').text(`Promedio de Intentos: ${promedio}`);
        }

        // Mostramos el mensaje al usuario
        $('#message').text(mensaje);
        // Mostramos los intentos
        $('#intentos').text(`Llevas ${gameState.intentos} intento(s)`);
    });

    // Botón de reinicio
    $('#reiniciar').click(function() {
        // Reiniciar el estado del juego
        gameState = {
            numeroSecreto: Math.floor(Math.random() * 1000) + 1,
            intentos: 0,
            mejorPuntaje: gameState.mejorPuntaje, // Mantener el mejor puntaje
            partidasFinalizadas: gameState.partidasFinalizadas, // Mantener el total de partidas
            sumaIntentos: gameState.sumaIntentos // Mantener la suma de intentos
        };

        $('#message').text(''); // Limpiar el mensaje
        $('#intentos').text(''); // Limpiar el contador
        $('#numero').val(''); // Limpiar el campo de entrada
    });
});