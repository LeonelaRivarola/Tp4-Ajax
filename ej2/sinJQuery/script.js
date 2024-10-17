let turnosDisponibles = [];

//cargo los limites guardados desde un archivo de texto
function cargarLimites(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET','limites.txt', true);
    xhttp.onload = function(){
        if(xhttp.status === 200){
            const limites = xhttp.responseText.split(',');
            document.getElementById('minValue').value = limites [0];
            document.getElementById('maxValue').value = limites [1];
            actualizarTurnosDisponibles(limites[0], limites[1]);
        }
    };
    xhttp.send();
}

//Funcion para guardas los limites en un archivo de texto
function guardarLimites(){
    const minValue = document.getElementById('minValue').value;
    const maxValue = document.getElementById('maxValue').value;

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'guardarLimites.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            actualizarTurnosDisponibles(minValue, maxValue);
            alert('Límites guardados correctamente');
        }
    };
    xhr.send(`min=${minValue}&max=${maxValue}`);
}

// Función para actualizar la lista de turnos disponibles según los límites
function actualizarTurnosDisponibles(min, max) {
    turnosDisponibles = [];
    for (let i = parseInt(min); i <= parseInt(max); i++) {
        turnosDisponibles.push(i);
    }
}

// Función para generar un turno aleatorio sin repetición
function generarTurnoAleatorio() {
    if (turnosDisponibles.length === 0) {
        document.getElementById('resultado').innerText = 'No hay más turnos disponibles';
        return;
    }
    const indiceAleatorio = Math.floor(Math.random() * turnosDisponibles.length);
    const turno = turnosDisponibles[indiceAleatorio];

    document.getElementById('resultado').innerText = `El turno es: ${turno}`;
    turnosDisponibles.splice(indiceAleatorio, 1);
}

/// Eventos para los botones
document.getElementById('guardarLimitesBtn').addEventListener('click', guardarLimites);
document.getElementById('generarTurnoBtn').addEventListener('click', generarTurnoAleatorio);

// Cargar límites guardados al iniciar
cargarLimites();
    
    // Genera un número aleatorio entre 1 y 100 (puedes ajustar el rango según tus necesidades)
    //const randomTurno = Math.floor(Math.random() * 100) + 1;

    // Muestra el número en el elemento con id 'turno-display'
    //document.getElementById('turno-display').innerText = `Tu turno es: ${randomTurno}`;

