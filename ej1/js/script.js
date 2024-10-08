document.addEventListener('DOMContentLoaded', function(){

    //Generar el numero aleatorio 
    let randomNumber = Math.floor(Math.random() * 1000) + 1;
    console.log("Numero aleatorio generado: ", randomNumber);

    document.getElementById('boton').addEventListener('click', function(){
        let numberUser = parseInt(document.getElementById('numero').value);

        //Verifico que el numero ea valido
        if(isNaN(numberUser) || numberUser < 1 || numberUser > 1000){
            document.getElementById('message').textContent = "Por favor ingrese un número valido";
            return;
        }

        //Enviar la solicitud AJAX
        if(window.XMLHttpRequest) { // Navegadores que siguen los estándares
            peticion_http = new XMLHttpRequest();
        }
        peticion_http.open('GET', 'http://localhost/tp4-ajax/ej1/numeros.html', true)
        
        if(peticion_http.readyState == 4){ 
            if(peticion_http.status === 200){
                //Logica para comparar numeros
                if(numberUser < randomNumber){
                    document.getElementById('message').textContent = "El número ingresado es menor";
                }else if(numberUser > randomNumber){
                    document.getElementById('message').textContent = "El número ingresado es mayor";
                } else {
                    document.getElementById('message').textContent = "Felicidades, adivinaste el número";
                }

            }
        }
        };
        peticion_http.send();
    });
});