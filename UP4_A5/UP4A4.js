/**
 * UP4_A4 · Formulario web con validación y manejo del DOM — SOLUCIÓN DEL PROFESOR
 * Módulo ES: se abre con Live Server.
 */
import { comunidades } from "./UP4A4-comunidades.js";
import { provincias } from "./UP4A4-provincias.js";
import { municipios } from "./UP4A4-municipios.js";

const form = document.getElementById("user-form");
const loginForm = document.getElementById("login-form");
const usuarioLogin = document.getElementById("usuario-login");
const logOutButton = document.getElementById("cerrar-sesion");
const userData = document.getElementById("userData");
const tbody = document.querySelector("#users-list tbody");
const campos = form.elements;
const {
	nombre,
	dni,
	telefono,
	usuario,
	email,
	email2,
	cp,
	comunidad,
	provincia,
	municipio,
	terminos,
} = campos;
const genero = campos.genero; // RadioNodeList
const intereses = campos.intereses; // RadioNodeList de checkboxes

/** Usuarios registrados (array interno). */
const usuarios = [];

// =====================================================
// Expresiones regulares (5g)
// =====================================================
const LETRAS = "A-Za-zÁÉÍÓÚÜÑáéíóúüñ";
const RE = {
	// de 2 a 5 palabras, solo letras, separadas por UN espacio, sin espacios al principio ni al final
	nombre: new RegExp(`^[${LETRAS}]+(?: [${LETRAS}]+){1,4}$`),
	dni: /^\d{8}-[A-Za-z]$/,
	telefono: /^\d{3}-\d{2}-\d{2}-\d{2}$/,
	// empieza por letra o número; puede llevar - . _ en medio; no termina en símbolo
	usuario: /^[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9])?$/,
	cp: /^\d{5}$/,
};

// =====================================================
// Mensajes personalizados por tipo de error (6e)
// =====================================================
const MENSAJES = {
	nombre: {
		valueMissing: "Obligatorio",
		tooShort: "Mínimo 4 caracteres",
		customError: "Entre 2 y 5 palabras, solo letras y sin espacios sobrantes",
	},
	dni: { valueMissing: "Obligatorio", customError: "Formato 12345678-X" },
	telefono: { customError: "Formato 000-00-00-00" },
	genero: { valueMissing: "Elige una opción" },
	usuario: {
		valueMissing: "Obligatorio",
		customError: "Letras, números y - . _ ; empieza y acaba en letra o número",
	},
	email: { valueMissing: "Obligatorio", typeMismatch: "Correo no válido" },
	email2: {
		valueMissing: "Obligatorio",
		typeMismatch: "Correo no válido",
		customError: "Los correos no coinciden",
	},
	cp: { customError: "Formato 00000" },
	intereses: { customError: "Elige al menos 3 intereses" },
	terminos: { valueMissing: "Debes aceptar los términos" },
};

// =====================================================
// Selects dependientes (6e)
// =====================================================

/**
 * Rellena un <select> con una primera opción en blanco y las opciones recibidas.
 * @param {HTMLSelectElement} select
 * @param {{codigo: string, nombre: string}[]} datos
 */
function rellenarSelect(select, datos) {
	select.replaceChildren(
		new Option("", ""),
		...datos.map((d) => new Option(d.nombre, d.codigo)),
	);
}

rellenarSelect(comunidad, comunidades);
rellenarSelect(provincia, []);
rellenarSelect(municipio, []);

comunidad.addEventListener("change", () => {
	rellenarSelect(
		provincia,
		provincias.filter((p) => p.comunidad === comunidad.value),
	);
	rellenarSelect(municipio, []); // al cambiar de comunidad se vacían los municipios
});

provincia.addEventListener("change", () => {
	rellenarSelect(
		municipio,
		municipios.filter((m) => m.provincia === provincia.value),
	);
});

// =====================================================
// Validación (5d, 5f)
// =====================================================

/**
 * Devuelve el <span class="error-text"> asociado a un campo.
 * @param {HTMLInputElement} campo
 * @returns {HTMLElement}
 */
function spanError(campo) {
	if (campo.name === "genero" || campo.name === "intereses") {
		return campo
			.closest(".grupo, fieldset")
			.querySelector(":scope > .error-text");
	}
	return campo.parentElement.querySelector(".error-text");
}

/**
 * Valida un campo (o un grupo de radios/checkboxes) y muestra su mensaje.
 * @param {string} nombreCampo  atributo name del campo
 * @returns {boolean}
 */
function validar(nombreCampo) {
	const campo =
		nombreCampo === "genero"
			? genero[0]
			: nombreCampo === "intereses"
				? intereses[0]
				: campos[nombreCampo];
	const valor = campo.value;
	let error = "";

	if (RE[nombreCampo] && valor && !RE[nombreCampo].test(valor))
		error = "formato";
	if (nombreCampo === "email2" && valor && valor !== email.value)
		error = "distintos";
	if (
		nombreCampo === "intereses" &&
		Array.from(intereses).filter((c) => c.checked).length < 3
	)
		error = "pocos";

	campo.setCustomValidity(error);
	const ok = campo.checkValidity();

	campo.classList.toggle("error", !ok);
	spanError(campo).textContent = ok
		? ""
		: mensajeDe(nombreCampo, campo.validity);
	return ok;
}

/**
 * Primer mensaje personalizado que corresponda al estado de validity.
 * @param {string} nombreCampo
 * @param {ValidityState} validity
 * @returns {string}
 */
function mensajeDe(nombreCampo, validity) {
	for (const clave in MENSAJES[nombreCampo]) {
		if (validity[clave]) return MENSAJES[nombreCampo][clave];
	}
	return "Valor no válido";
}

const A_VALIDAR = [
	"nombre",
	"dni",
	"telefono",
	"genero",
	"cp",
	"usuario",
	"email",
	"email2",
	"intereses",
	"terminos",
];

// Validación en tiempo real
dni.addEventListener("change", () => validar("dni"));
telefono.addEventListener("change", () => validar("telefono"));
email.addEventListener("input", () => {
	validar("email");
	if (email2.value) validar("email2");
}); // validación cruzada
email2.addEventListener("input", () => validar("email2"));

// No se permite pegar en «Repetir email» (ejercicio de eventos; en producción empeora la accesibilidad)
email2.addEventListener("paste", (e) => e.preventDefault());

// =====================================================
// Envío y reinicio (6d, 6e)
// =====================================================

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const resultados = A_VALIDAR.map(validar); // validar TODO para mostrar todos los errores
	if (!resultados.every(Boolean)) return;

	const nuevo = {
		nombre: nombre.value,
		dni: dni.value.toUpperCase(),
		telefono: telefono.value,
		genero: genero.value,
		comunidad: comunidad.value, // se guardan CÓDIGOS, no nombres
		provincia: provincia.value,
		municipio: municipio.value,
		direccion: campos.direccion.value,
		cp: cp.value,
		usuario: usuario.value,
		email: email.value,
		intereses: Array.from(intereses)
			.filter((c) => c.checked)
			.map((c) => c.value),
	};
	usuarios.push(nuevo);
	añadirFila(nuevo);
	form.reset();
	guardarLista();
});

document.addEventListener("DOMContentLoaded", (event) => {
	const storedUserData = localStorage.getItem("clientes");
	if (storedUserData) {
		try {
			const usersData = JSON.parse(storedUserData);
			usersData.forEach((userData) => {
				añadirFila(userData);
				usuarios.push(userData);
			});
		} catch (error) {
			console.error("Failed to parse json:", error.message);
			usuarios.length = 0;
		}
	}

	const contadorSpam = document.getElementById("contador");
	const visitas = sessionStorage.getItem("visitas");
	let contador = 0;

	if (visitas) {
		contador = parseInt(visitas);
	}

	contador++;

	contadorSpam.textContent = contador;
	sessionStorage.setItem("visitas", contador);

	const userLogin = sessionStorage.getItem("userLogin");
	if (userLogin) {
		const jsonLogin = JSON.parse(userLogin);
		userData.textContent = `Bienvenido ${jsonLogin.name}, fecha: ${jsonLogin.date}`;
	} else {
		userData.textContent = `registra un usuario`;
	}

	const banner = document.getElementById("cookie-banner");
	const cookiePreferences = localStorage.getItem("cookiePreferences");
	banner.style.display = cookiePreferences === null ? "block" : "none";

	const saveCokie = document.getElementById("guardar-cookies");
	const marketingCokie = document.getElementById("cookies-marketing");
	const cookiesTracking = document.getElementById("cookies-tracking");

	saveCokie.addEventListener("click", () => {
		const cookiePreferences = localStorage.getItem("cookiePreferences");

		if (cookiePreferences === null) {
			const preferences = {
				marketing: marketingCokie.checked,
				seguimiento: cookiesTracking.checked,
			};
			banner.style.display = "none";
			localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
		} else {
			banner.style.display = "none";
		}
	});
});

const guardarLista = () => {
	try {
		localStorage.setItem("clientes", JSON.stringify(usuarios));
		return true;
	} catch (error) {
		console.error("Failed to parse json:", error.message);

		return false;
	}
};

window.addEventListener("storage", (event) => {
	if (event.key === "clientes") {
		const newUsers = JSON.parse(event.newValue);
		tbody.innerHTML = "";
		newUsers.forEach((usuario) => {
			añadirFila(usuario);
		});
	}
});

/**
 * Añade una fila a la tabla generada con el DOM.
 * @param {object} u
 */
function añadirFila(u) {
	const tr = document.createElement("tr");
	const celdas = [
		u.nombre,
		u.dni,
		u.usuario,
		u.email,
		[u.comunidad, u.provincia, u.municipio].filter(Boolean).join(" / ") || "—",
		u.intereses.join(", "),
	];
	for (const texto of celdas) {
		const td = document.createElement("td");
		td.textContent = texto;
		tr.append(td);
	}
	tbody.append(tr);
}

// Al reiniciar se eliminan todos los efectos de validación (el evento reset llega ANTES de vaciar los campos)
form.addEventListener("reset", () => {
	for (const campo of form.elements) {
		if (campo.setCustomValidity) campo.setCustomValidity("");
		campo.classList.remove("error");
	}
	form.querySelectorAll(".error-text").forEach((s) => {
		s.textContent = "";
	});
	rellenarSelect(provincia, []);
	rellenarSelect(municipio, []);
});

loginForm.addEventListener("submit", (e) => {
	const userLogin = {
		name: usuarioLogin.value,
		date: new Date(),
	};
	console.log(userLogin);
	e.preventDefault();
	sessionStorage.setItem("userLogin", JSON.stringify(userLogin));

	let data = sessionStorage.getItem("userLogin");
	const jsonLogin = JSON.parse(data);
	userData.textContent = `Bienvenido ${jsonLogin.name}, fecha: ${jsonLogin.date}`;
	console.log(jsonLogin.name);
});

logOutButton.addEventListener("click", (e) => {
	e.preventDefault();
	sessionStorage.removeItem("userLogin");
	userData.textContent = "";
	usuarioLogin.value = "";
});
