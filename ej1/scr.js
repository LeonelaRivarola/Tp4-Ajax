$(document).ready(function () {
    $('#boton').click(function () {
        let numero = $('#numero').val(); // Obtenemos el número ingresado por el usuario

        $.ajax({
            url: 'procesar_numero.php', // URL completa donde está el archivo PHP
            type: 'POST',
            data: { numero: numero },
            success: function (respuesta) {
                let data = JSON.parse(respuesta);
                $('#message').text(data.mensaje);
                $('#intentos').text('Intentos: ' + data.intentos);
                $('#mejor-puntaje').text('Mejor Puntaje: ' + data.mejorPuntaje);
                $('#partidas-finalizadas').text('Partidas Finalizadas: ' + data.partidasFinalizadas);
                $('#promedio-intentos').text('Promedio de Intentos: ' + data.promedioIntentos);
            },
            error: function () {
                $('#message').text('Hubo un error al comunicarse con el servidor.');
            }
        });
    });

    $('#reiniciar').click(function () {
        location.reload(); // Reinicia la página para reiniciar la partida
    });
});
