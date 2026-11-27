"use strict";
/* =====================================================================
   UP5 · Panel de administración · CÓDIGO DE PARTIDA
   Completa los TODO. No modifiques los bloques marcados con  Dado.
   ===================================================================== */

/* Dado · Utilidades ------------------------------------------------ */
const $ = (selector) => document.querySelector(selector);

/** Muestra el estado de un widget. tipo: 'cargando' | 'ok' | 'error' | '' */
function ponerEstado(idWidget, tipo, texto) {
	const p = $(`#${idWidget} .estado`);
	p.className = `estado ${tipo}`;
	p.textContent = texto;
}

/** URL de una ruta de la API. Si «Simular fallos» está marcado, añade &fallos=1 */
let simularFallos = false;
function urlApi(ruta) {
	return `api/?r=${ruta}${simularFallos ? "&fallos=1" : ""}`;
}

const euros = (n) =>
	n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
const horaActual = () => new Date().toLocaleTimeString("es-ES");

/* =====================================================================
   Ejercicio 1 · Reloj (setInterval)
   ===================================================================== */
function actualizarReloj() {
	// TODO 1: pinta la hora actual en #reloj (usa horaActual()).
	const reloj = document.getElementById("reloj");
	reloj.textContent = horaActual();
}
actualizarReloj();

function iniciarReloj() {
	// TODO 1: pinta la hora una vez y luego repítelo cada segundo con setInterval.
	actualizarReloj();
	setInterval(() => {
		actualizarReloj();
	}, 1000);
}

/* =====================================================================
   Ejercicio 2 · Avisos temporales (setTimeout + clearTimeout)
   ===================================================================== */
let idAviso = null;

function mostrarAviso(texto) {
	// TODO 2: escribe el texto en #aviso y muéstralo (hidden = false).
	const aviso = document.getElementById("aviso");
	aviso.hidden = false;
	aviso.textContent = texto;
	// TODO 2: ocúltalo a los 3 s con setTimeout. Guarda el id en idAviso.
	if (idAviso !== null) {
		clearTimeout(idAviso);
		idAviso = null;
	}

	idAviso = setTimeout(() => {
		aviso.hidden = true;
	}, 3000);
	// TODO 2: si llega otro aviso antes, cancela el temporizador anterior con clearTimeout.
}

/* =====================================================================
   Ejercicio 3 · Caducidad de la sesión (setInterval + clearInterval)
   ===================================================================== */
const DURACION_SESION = 60;
let segundosSesion = DURACION_SESION;
let idSesion = null;

function pintarSesion() {
	// TODO 3: escribe segundosSesion en #sesion-restante.
	const sesionRestante = document.getElementById("sesion-restante");
	sesionRestante.textContent = segundosSesion;
	// TODO 3: añade la clase 'alerta' a #sesion cuando queden 10 s o menos (classList.toggle).
	const sesion = document.getElementById("sesion");
	if (segundosSesion <= 10) {
		sesion.classList.toggle("alerta");
	}
}

function tickSesion() {
	// TODO 3: resta 1 segundo y repinta.
	segundosSesion--;
	pintarSesion();
	// TODO 3: cuando queden exactamente 10 s, llama a mostrarAviso('Tu sesión caduca en 10 segundos').
	if (segundosSesion === 10) {
		mostrarAviso("Tu sesión caduca en 10 segundos");
	}
	// TODO 3: cuando llegue a 0, llama a caducarSesion().

	if (segundosSesion === 0) {
		caducarSesion();
	}
}

function iniciarSesion() {
	// TODO 3: si ya hay un intervalo activo (idSesion !== null), no hagas nada.
	if (idSesion !== null) return;
	// TODO 3: reinicia segundosSesion, repinta y arranca setInterval(tickSesion, 1000) guardando el id.
	segundosSesion = DURACION_SESION;
	pintarSesion();
	idSesion = setInterval(tickSesion, 1000);
}

function renovarSesion() {
	// TODO 3: vuelve a poner los segundos a DURACION_SESION y repinta.
	segundosSesion = 60;
	pintarSesion();
	// TODO 3: ¡OJO! No crees otro intervalo.
}

function caducarSesion() {
	// TODO 3: detén el intervalo, pon idSesion a null, llama a detenerActividad()
	clearInterval(idSesion);
	idSesion = null;
	detenerActividad();
	// TODO    y muestra #caducada.
	const caducada = document.getElementById("caducada");
	caducada.hidden = false;
}

function volverAEntrar() {
	// TODO 3: oculta #caducada y vuelve a iniciar la sesión.
	const caducada = document.getElementById("caducada");
	caducada.hidden = true;
	iniciarSesion();
}

/* =====================================================================
   Ejercicio 4 · Función api() + resumen (fetch, res.ok, json)
   ===================================================================== */
async function api(ruta) {
	// TODO 4: haz fetch(urlApi(ruta)).
	const response = await fetch(urlApi(ruta));
	// TODO 4: si la respuesta NO es correcta (res.ok), lee el JSON de error
	//         ({ error, codigo }) y lanza new Error(`${res.status} · ${mensaje}`).
	if (!response.ok) {
		throw new Error(`estado:${response.status} mensaje`);
	} else {
		const data = await response.json();
		return data;
	}
	// TODO 4: si es correcta, devuelve los datos ya convertidos (res.json()).
}

async function cargarResumen() {
	// TODO 4: pon el estado 'cargando'.
	const divCargarResumen = document.getElementById("w-resumen");
	const estadoResumen = divCargarResumen.querySelector(".estado");
	estadoResumen.textContent = "Cargando....";
	// TODO 4: con await api('resumen') obtén los datos y píntalos en #res-ventas (con euros()),

	// TODO    #res-pedidos y #res-tickets. Termina con estado 'ok' y la hora.
	// TODO 4: si falla (try/catch), estado 'error' con error.message y mostrarAviso(...).
	try {
		const data = await api("resumen");
		const restultadoVentas = document.getElementById("res-ventas");
		restultadoVentas.textContent = `${data.ventasHoy} ${euros("€")}`;

		const restutadoPedidos = document.getElementById("res-pedidos");
		restutadoPedidos.textContent = `${data.pedidosHoy}`;

		const restutadoTickets = document.getElementById("res-tickets");
		restutadoTickets.textContent = `${data.ticketsAbiertos}`;
		estadoResumen.textContent = "pedidos Cargados";
	} catch (error) {
		mostrarAviso(error.message);
	}
}

/* =====================================================================
   Ejercicio 5 · Último pedido + su cliente (dos peticiones encadenadas)
   ===================================================================== */
async function cargarUltimoPedido() {
	// TODO 5: paso 1 → await api('pedidos') y quédate con el ÚLTIMO pedido.
	const divCargarPedidio = document.getElementById("w-pedido");
	let cargandoPedido = divCargarPedidio.querySelector(".estado");
	cargandoPedido.textContent = "cargando…";
	try {
		const data = await api("pedidos");
		const ultimoPedido = data.at(-1);
		// TODO    Pinta #ped-id, #ped-total y #ped-estado.
		const pedidoId = document.getElementById("ped-id");
		const pedidoTotal = document.getElementById("ped-total");
		const pedidoEstado = document.getElementById("ped-estado");
		cargandoPedido.textContent = "";
		cargandoPedido.textContent = "Paso 1/2…";
		pedidoId.textContent = ultimoPedido.id;
		pedidoTotal.textContent = ultimoPedido.total;
		pedidoEstado.textContent = ultimoPedido.estado;

		// TODO 5: paso 2 → con su clienteId pide `clientes/${id}` y pinta #ped-cliente y #ped-ciudad.
		const clientes = await api(`clientes/${ultimoPedido.clienteId}`);
		const pedidoCliente = document.getElementById("ped-cliente");
		const pedidoCiudad = document.getElementById("ped-ciudad");
		cargandoPedido.textContent = "";
		cargandoPedido.textContent = "Paso 2/2…";
		pedidoCliente.textContent = clientes.nombre;
		pedidoCiudad.textContent = clientes.ciudad;
		// TODO 5: muestra en el estado en qué paso estás ('Paso 1/2…', 'Paso 2/2…').
		// TODO 5: gestiona el error igual que en el ejercicio 4.
	} catch (error) {
		mostrarAviso(error.message);
	}
}

/* =====================================================================
   Ejercicio 6 · Recargar en serie y en paralelo (Promise.all)
   ===================================================================== */
async function recargarEnSerie() {
	// TODO 6: guarda performance.now(), espera cargarResumen() y DESPUÉS cargarUltimoPedido().
	// TODO 6: muestra en #tiempo-carga los ms que ha tardado.

	try {
		const tiempo = performance.now();
		await cargarResumen();
		await cargarUltimoPedido();
		const tiempoCarga = document.getElementById("tiempo-carga");
		tiempoCarga.textContent = `el tiempo de carga es de: ${(tiempo / 1000).toFixed(2)} segundos`;
	} catch (error) {
		mostrarAviso(error.message);
	}
}

async function recargarEnParalelo() {
	// TODO 6: igual, pero lanzando las dos a la vez con Promise.all([...]).

	try {
		const tiempo = performance.now();
		await Promise.all([await cargarResumen(), await cargarUltimoPedido()]);
		const tiempoCarga = document.getElementById("tiempo-carga");
		tiempoCarga.textContent = `el tiempo de carga es de: ${(tiempo / 1000).toFixed(2)} segundos`;
	} catch (error) {
		mostrarAviso(error.message);
	}
}

/* =====================================================================
   Ejercicio 7 · Actividad en directo (sondeo con setTimeout encadenado)
   ===================================================================== */
const INTERVALO_ACTIVIDAD = 3000;
const MAX_EVENTOS = 5;
let actividadActiva = false;
let idActividad = null;

function pintarEvento(evento) {
	// TODO 7: crea un <li> con un <time> (evento.hora) y el texto (evento.texto).
	const actLista = document.getElementById("act-lista");
	const li = document.createElement("li");
	const timeElement = document.createElement("time");
	timeElement.textContent = `hora: ${evento.hora} mensaje: ${evento.texto}`;
	// TODO 7: añádelo AL PRINCIPIO de #act-lista (prepend) y deja como máximo MAX_EVENTOS.
	actLista.prepend(li);
}

async function sondearActividad() {
	// TODO 7: pide 'actividad', píntala y pon estado 'ok' (o 'error' si falla).
	// TODO 7: AL TERMINAR (haya ido bien o mal), si actividadActiva sigue a true,
	// TODO    programa la siguiente consulta con setTimeout(sondearActividad, INTERVALO_ACTIVIDAD).
}

function iniciarActividad() {
	// TODO 7: si ya está activa, no hagas nada. Si no, actívala y llama a sondearActividad().
	if (actividadActiva) return;
	else {
		sondearActividad();
	}
}

function detenerActividad() {
	// TODO 7: pon actividadActiva a false, cancela idActividad con clearTimeout
	actividadActiva = false;
	clearTimeout(idActividad);
	// TODO    y pon el estado 'Detenido'.
	estado.textContent = "Detenido";
}

/* =====================================================================
   ✅ Dado · Arranque y botones (los eventos no se evalúan aquí)
   ===================================================================== */
$("#btn-renovar").addEventListener("click", renovarSesion);
$("#btn-volver").addEventListener("click", volverAEntrar);
$("#btn-serie").addEventListener("click", recargarEnSerie);
$("#btn-paralelo").addEventListener("click", recargarEnParalelo);
$("#btn-act-iniciar").addEventListener("click", iniciarActividad);
$("#btn-act-detener").addEventListener("click", detenerActividad);
$("#chk-fallos").addEventListener("change", (e) => {
	simularFallos = e.target.checked;
});

iniciarReloj();
iniciarSesion();
cargarResumen();
cargarUltimoPedido();
pintarSesion();
mostrarAviso("Prueba de aviso");
