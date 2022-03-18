// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listeners
formulario.addEventListener("submit", agregarTarea);

document.addEventListener("DOMContentLoaded", () => {
	tweets = JSON.parse(localStorage.getItem("tweets")) || [];
	crearHTML();
});

// funciones
function agregarTarea(e) {
	e.preventDefault();

	// TextArea donde se escriben las tareas
	const tweet = document.querySelector("#tweet").value;

	// validacion
	if (!tweet) {
		mostarError("Debes escribir una tarea");

		return;
	}

	const tweetObj = {
		id: Date.now(),
		tweet,
	};

	tweets = [...tweets, tweetObj];
	crearHTML();

	formulario.reset();
}

function mostarError(error) {
	const mensajeError = document.createElement("p");
	mensajeError.textContent = error;
	mensajeError.classList.add("error");
	const contenido = document.querySelector("#contenido");
	contenido.appendChild(mensajeError);
	setTimeout(() => {
		mensajeError.remove();
	}, 3000);
}

// Mostrar Listado Tweets

function crearHTML() {
	limpiarHTML();
	if (tweets.length > 0) {
		tweets.forEach((tweet) => {
			// !Agregar Botón de Eliminar
			const btnEliminar = document.createElement("a");
			btnEliminar.classList.add("borrar-tweet");
			btnEliminar.innerText = "X";

			// !Funcion para eliminar
			btnEliminar.onclick = () => {
				borrarTweet(tweet.id);
			};

			// !Crear el HTML
			const li = document.createElement("li");

			// !Añadir Texto
			li.innerText = tweet.tweet;

			// !Añadir Botón
			li.appendChild(btnEliminar);

			// !insertar todo al DOM
			listaTweets.appendChild(li);
		});
	}
	sincronizarStorage();
}

// limpiar el html

function limpiarHTML() {
	while (listaTweets.firstChild) {
		listaTweets.removeChild(listaTweets.firstChild);
	}
}

function sincronizarStorage() {
	localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
	tweets = tweets.filter((tweet) => tweet.id != id);
	crearHTML();
}
