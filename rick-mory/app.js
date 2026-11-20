// UP5_A4 · Explorador de Rick and Morty con fetch
// Completa los TODO. Lo marcado como «ya hecho» no hace falta tocarlo.

const API = "https://rickandmortyapi.com/api";
const URL_VALORACIONES = "https://jsonplaceholder.typicode.com/posts";
const TIEMPO_MAXIMO = 8000;

// ---------- Referencias al DOM (ya hecho) ----------
const $ = (id) => document.getElementById(id);
const vistaEpisodios = $("vista-episodios");
const vistaPersonajes = $("vista-personajes");
const contEpisodios = $("episodios");
const contPersonajes = $("personajes");
const contResultados = $("resultados-busqueda");
const estadoEpisodios = $("estado-episodios");
const estadoPersonajes = $("estado-personajes");
const estadoBusqueda = $("estado-busqueda");
const estadoValoracion = $("estado-valoracion");
const btnAnterior = $("pagina-anterior");
const btnSiguiente = $("pagina-siguiente");
const btnReintentarEpisodios = $("reintentar-episodios");
const btnReintentarPersonajes = $("reintentar-personajes");
const formBusqueda = $("form-busqueda");
const formValoracion = $("form-valoracion");
const ficha = $("ficha");

// ---------- Estado de la aplicación ----------
let paginaActual = 1;
let totalPaginas = 1;
let episodioActual = null; // episodio que se está viendo
const episodios = new Map(); // id → episodio (de la página cargada)
const personajes = new Map(); // id → personaje (los ya recibidos)
let busquedaEnCurso = null; // AbortController de la última búsqueda

// ---------- Utilidades de interfaz (ya hecho) ----------
/** tipo: '' | 'cargando' | 'error' | 'ok' */
function mostrarEstado(elemento, mensaje, tipo = "") {
	elemento.textContent = mensaje;
	elemento.className = `estado ${tipo}`.trim();
}

/** Crea un elemento con clase y texto. El texto va siempre con textContent. */
function crear(etiqueta, clase = "", texto = "") {
	const el = document.createElement(etiqueta);
	if (clase) el.className = clase;
	if (texto) el.textContent = texto;
	return el;
}

function tarjetaPersonaje(p) {
	const boton = crear("button", "tarjeta-personaje");
	boton.type = "button";
	boton.dataset.id = p.id;
	const img = crear("img");
	img.src = p.image;
	img.alt = "";
	img.loading = "lazy";
	const datos = crear("span", "datos");
	datos.append(
		crear("strong", "", p.name),
		crear("span", `etiqueta ${p.status.toLowerCase()}`, p.status),
		` ${p.species}`,
	);
	boton.append(img, datos);
	return boton;
}

// ---------- Ejercicio 4 · Petición genérica y errores ----------
/**
 * Pide una URL y devuelve el JSON ya convertido.
 * - Lanza un Error con la propiedad status si la respuesta no es 2xx.
 * - Cancela la petición si supera TIEMPO_MAXIMO (TimeoutError).
 * - opciones.signal permite cancelarla desde fuera (AbortError).
 */
async function pedirJSON(url, opciones = {}) {
	// TODO Ej. 1: fetch, comprobar res.ok y devolver await res.json().
	// TODO Ej. 4: si !res.ok, lanza un Error con la propiedad status.
	// TODO Ej. 5: tiempo máximo con AbortController y cancelación externa con opciones.signal.
}

/** Traduce un error técnico en un mensaje para el usuario. Se compara e.name, no el texto. */
function mensajeDeError(e) {
	// TODO Ej. 4: TimeoutError → tiempo agotado · e.status → «El servidor ha respondido con un error (código)» · resto → red.
}

// ---------- Ejercicio 1 · Episodios y paginación ----------
async function cargarEpisodios(pagina = 1) {
	// TODO: estado «Cargando episodios…», vaciar la rejilla y ocultar «Reintentar».
	// TODO: pedir `${API}/episode?page=${pagina}` y guardar info.pages.
	// TODO: una tarjeta (button.tarjeta-episodio con data-id) por episodio: nombre, código y fecha.
	// TODO: actualizar la paginación. Si falla: mensaje, botón «Reintentar» y console.error.
	const seccionEpisodios = document.getElementById("section-episodios");
	const estadoEpisodios = document.getElementById("estado-episodios");
	mostrarEstado(estadoEpisodios, "Cargando episodios…", "cargando");
	seccionEpisodios.appendChild(estadoEpisodios);
	const rejillaEpisodios = document.getElementById("episodios");
	rejillaEpisodios.textContent = "";
	try {
		const response = await fetch(`${API}/episode?page=${pagina}`);
		const dataEpisodes = await response.json();
		console.log(dataEpisodes);
		const episodes = dataEpisodes.results;
		episodes.forEach((episode) => {
			const cardEpisode = crear("div", "tarjeta-episodio");
			const episodeName = episode.name;
			console.log(episodeName);
			const episodeNameElement = crear(
				"strong",
				"tarjeta-episodio strong",
				episodeName,
			);
			const episodeCodeNumber = `${episode.episode}.`;
			const episodeCode = crear("spam", "codigo", episodeCodeNumber);
			const dateEpisodeData = episode.air_date;
			const date = crear("strong", "strong", dateEpisodeData);
			const divInfoEpisode = crear("div", "fila");
			rejillaEpisodios.appendChild(cardEpisode);
			cardEpisode.appendChild(episodeNameElement);
			cardEpisode.appendChild(divInfoEpisode);
			divInfoEpisode.appendChild(episodeCode);
			divInfoEpisode.appendChild(date);
		});
		const allEpisodes = dataEpisodes.info.count;
		totalPaginas = dataEpisodes.info.pages;
		const paginaInfo = document.getElementById("pagina-info");
		paginaInfo.textContent = `pagina ${pagina} de ${allEpisodes}`;
		paginaActual = pagina;
		if (totalPaginas > paginaActual) {
			btnSiguiente.disabled = false;
		} else {
			btnSiguiente.disabled = true;
		}
		if (paginaActual > 1) {
			btnAnterior.disabled = false;
		} else {
			btnAnterior.disabled = true;
		}
	} catch (error) {
		console.log(error);
	}
}

// ---------- Ejercicio 2 · Personajes de un episodio ----------
async function verEpisodio(ep) {
	episodioActual = ep;
	vistaEpisodios.hidden = true;
	vistaPersonajes.hidden = false;
	$("titulo-episodio").textContent = `${ep.episode} · ${ep.name}`;
	mostrarEstado(estadoValoracion, "");
	// TODO: saca los id de ep.characters (son URL que acaban en el id).
	// TODO: UNA sola petición a `${API}/character/${ids}`. Ojo: con un solo id la API devuelve un objeto, no un array.
	// TODO: pinta cada personaje con tarjetaPersonaje(p) y guárdalo en el Map personajes. Trata carga y error.
}

function volverAEpisodios() {
	vistaPersonajes.hidden = true;
	vistaEpisodios.hidden = false;
	episodioActual = null;
}

// ---------- Ejercicio 3 · Ficha del personaje ----------
function abrirFicha(p) {
	// TODO: rellena #ficha-imagen, #ficha-nombre y #ficha-datos (pares dt/dd): estado, especie y tipo, género, origen, última localización y número de episodios.
	// TODO: abre el <dialog> con showModal(). No hace falta otra petición: el dato ya está en el Map.
}

/** Delegación: un solo manejador por rejilla de personajes. */
function alPulsarPersonaje(e) {
	const tarjeta = e.target.closest(".tarjeta-personaje");
	if (tarjeta) abrirFicha(personajes.get(Number(tarjeta.dataset.id)));
}

// ---------- Ejercicio 5 · Buscador con cancelación ----------
async function buscarPersonajes() {
	// TODO: cancela la búsqueda anterior (busquedaEnCurso?.abort()) y crea un AbortController nuevo.
	// TODO: construye la URL con URLSearchParams a partir del formulario (name y status).
	// TODO: 404 significa «sin resultados», no es un error. AbortError se ignora.
}

// ---------- Ejercicio 6 · Enviar datos: POST con JSON ----------
async function enviarValoracion(e) {
	e.preventDefault();
	// TODO: POST a URL_VALORACIONES con { episodioId, nota, comentario } en JSON (method + headers + JSON.stringify).
	// TODO: muestra «Valoración n.º <id> registrada» y reinicia el formulario. Deshabilita el botón mientras se envía.
}

// ---------- Ejercicio 7 · Compatibilidad entre navegadores ----------
function comprobarCompatibilidad() {
	// TODO: comprueba que existen fetch y AbortController (detección de capacidades, no de navegador).
	// TODO: si falta alguna, muestra el aviso en #aviso-compatibilidad y devuelve false.
}

// ---------- Eventos (ya hecho) ----------
contEpisodios.addEventListener("click", (e) => {
	const tarjeta = e.target.closest(".tarjeta-episodio");
	if (tarjeta) verEpisodio(episodios.get(Number(tarjeta.dataset.id)));
});
contPersonajes.addEventListener("click", alPulsarPersonaje);
contResultados.addEventListener("click", alPulsarPersonaje);
btnAnterior.addEventListener("click", () => cargarEpisodios(paginaActual - 1));
btnSiguiente.addEventListener("click", () => cargarEpisodios(paginaActual + 1));
btnReintentarEpisodios.addEventListener("click", () =>
	cargarEpisodios(paginaActual),
);
btnReintentarPersonajes.addEventListener("click", () =>
	verEpisodio(episodioActual),
);
$("volver").addEventListener("click", volverAEpisodios);
formBusqueda.addEventListener("input", buscarPersonajes); // cada tecla lanza una búsqueda
formBusqueda.addEventListener("submit", (e) => e.preventDefault());
formValoracion.addEventListener("submit", enviarValoracion);

if (comprobarCompatibilidad() !== false) cargarEpisodios();
