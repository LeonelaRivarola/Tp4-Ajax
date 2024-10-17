var ID = 0;
var titulo = "";
var userid = "";
var cuerpo = "";

var aux = [];

// VARIABLES PAGINANDO
const postsPerPage = 20; // Número de posts por página
let currentPage = 1; // Página actual

//-----------------------------------------------------------

$(document).ready(function () {
  //cargar los posts al cargar la pagina

  fetchPosts();//me actualiza siempre al cambiar de pagina es asi, no puedo agregarle nuevos elementos a este json virtual

  $("#cargar").click(function () {
    titulo = $("#titulo").val();
    userid = $("#userid").val();
    cuerpo = $("#cuerpo").val();

    cargar();
  });

  $("#buscar").click(function () {
    titulo = $("#find").val();
    buscarTitulo();
  });

  $("#id").click(function () {
    ordenarPorId();
  });

  $("#titulos").click(function () {
    ordenarPorTitulo();
  });

  $("#Confirmar").click(function () {
    titulo = $("#tituloAct").val();
    userid = $("#useridAct").val();
    cuerpo = $("#cuerpoAct").val();
    actualizar();
  });

  // Control de paginación es mas eficiente por tener pocas lineas
  for (let i = 1; i <= 5; i++) {
    $(`#pag${i}`).click(function () {
      currentPage = i;
      fetchPosts(); // Llama a la función de carga para la página seleccionada
    });
  }
});

//=====================================================================================================
//=====================================================================================================
//PAGINADO

//se implementa mas abajo para las funciones ordenarportitulo, ordenarporid
//renderpost es para mostrar las publicacioenes de forma organizada en la iterfaz del usuario, facilitando la paginacion y la interactividad.

// Cargar los posts desde la API
function fetchPosts() {
  $.get("https://jsonplaceholder.typicode.com/posts", function (data) {
    aux = data; // Guardar datos para filtrar o paginar
    renderPosts(aux);
  });
}


// Función para renderizar publicaciones 
function renderPosts(posts) {
  let html = "";
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // Renderizar sólo los posts de la página actual
  posts.slice(startIndex, endIndex).forEach(post => {
    html += `<div class='post'>
              <h4>${post.title}</h4>
              <p>${post.body}</p>
              <button class='btn btn-warning' onclick='editar(${post.id})'>Editar</button>
              <button class='btn btn-danger' onclick='eliminar(${post.id})'>Eliminar</button>
            </div>`;
  });

  $("#lista").html(html);
}


//=========================================


// Cargar un nuevo post
function cargar() {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: 'POST',
    data: JSON.stringify({
      title: titulo,
      body: cuerpo,
      userId: userid
    }),
    contentType: 'application/json; charset=UTF-8',
    success: function (response) {
      var dato={
        id:aux.length,
        title:titulo,
        body:cuerpo,
        userId:userid
      }
      aux.push(dato);
      console.log(aux);
      $("#cargo").html("<p style='color:green';>Listo</p>");
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
}

//================================================================================================================
//================================================================================================================
//ORDENAMIENTO POR TITULO

function ordenarPorTitulo() {
  aux.sort((a, b) => a.title.localeCompare(b.title)); //ordena aux alfabeticamente segun el titulo
  renderPosts(aux); //cargar paramostrar la pag como deseo
}

//================================================================================================================
//================================================================================================================

//ORDENAMIENTO POR ID
function ordenarPorId() {
  aux.sort((a, b) => a.id - b.id);
  renderPosts(aux);
}


//================================================================================================================
//================================================================================================================

//BUSCAR POT TITULO
function buscarTitulo() {
  const filteredPosts = aux.filter(post => post.title.includes(titulo));
  renderPosts(filteredPosts);
}


//================================================================================================================
//================================================================================================================

//ACTUALIZAR

// Actualizar un post
function actualizar() {
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/posts/${ID}`,
    type: 'PUT',
    data: {
      title: titulo,
      body: cuerpo,
      userId: userid
    },
    success: function () {
      $("#mensaje").html("<p>Actualización exitosa.</p>");
      fetchPosts(); // Refrescar la lista
    }
  });
}

// Editar un post
function editar(id) {
  const post = aux.find(p => p.id === id);
  $("#tituloAct").val(post.title);
  $("#useridAct").val(post.userId);
  $("#cuerpoAct").val(post.body);
  ID = id; // Guardar ID para actualizar
}


//================================================================================================================
//================================================================================================================

//Borrar
function eliminar(id) {
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    type: 'DELETE',
    success: function () {
      fetchPosts(); // Refrescar la lista después de eliminar
    }
  });
}


//================================================================================================================
//================================================================================================================

// Filtrar por UserID
function filtro(userId) {
  const filteredPosts = aux.filter(post => post.userId === userId);
  renderPosts(filteredPosts);
}
