$(document).ready(function () {
    // Cargar límites y números previos al cargar la página
    cargarDatos();

    $('#guardar-limites').click(function () {
        const limiteInferior = $('#limite-inferior').val();
        const limiteSuperior = $('#limite-superior').val();

        $.ajax({
            url: 'guardarLimites.php',
            type: 'POST',
            data: {
                limiteInferior: limiteInferior,
                limiteSuperior: limiteSuperior
            },
            success: function () {
                //$('#mensaje-estado').text('Limites guardados exitosamente.');}
                $('#mensaje-estado').text('Límites guardados exitosamente.').fadeIn().delay(2000).fadeOut();            }
        });
    });

    $('#generar-numero').click(function () {
        $.ajax({
            url: 'generarNumero.php',
            type: 'GET',
            success: function (response) {
                const data = JSON.parse(response);
                if (data.error) {
                    $('#mensaje-error').text(data.error);
                } else {
                    $('#numero-generado').text('Número Generado: ' + data.numero);
                    $('#mensaje-error').text('');
                }
            }
        });
    });

    $('#reiniciar-sistema').click(function () {
        $.ajax({
            url: 'reiniciarSistema.php',
            type: 'GET',
            success: function () {
                $('#mensaje-estado').text('Sistema reiniciado.').fadeIn().delay(2000).fadeOut();                cargarDatos();
            }
        });
    });

    function cargarDatos() {
        $.ajax({
            url: 'cargarDatos.php',
            type: 'GET',
            success: function (response) {
                const data = JSON.parse(response);
                $('#limite-inferior').val(data.limiteInferior);
                $('#limite-superior').val(data.limiteSuperior);
            }
        });
    }
});
