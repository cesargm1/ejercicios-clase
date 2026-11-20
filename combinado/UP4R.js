/**
 * UP4 · Repaso (híbrido A3 + A4) · Inscripción al taller — STARTER
 * Módulo ES: se abre con Live Server.
 * Completa los TODO en orden. Cada TODO corresponde a un bloque de la práctica.
 */
import { comunidades } from "./UP4A4-comunidades.js";
import { provincias } from "./UP4A4-provincias.js";
import { municipios } from "./UP4A4-municipios.js";

// ---------- Configuración y elementos (ya hechos) ----------
const AFORO = 5; // plazas del taller (para la demo, 3)

const form = document.getElementById("inscripcion");
const tbody = document.querySelector("#inscritos tbody");
const confirmacion = document.getElementById("confirmacion");
const plazas = document.getElementById("plazas");
const botonEnviar = form.querySelector('button[type="submit"]');
const campos = form.elements;
const {
	nombre,
	email,
	email2,
	password,
	password2,
	comunidad,
	provincia,
	municipio,
	terminos,
} = campos;
const genero = campos.genero; // RadioNodeList
const intereses = campos.intereses; // RadioNodeList de checkboxes

const inscritos = []; // TODO 5: ¿qué guardamos aquí y por qué no en el HTML?
const tocados = new Set(); // campos ya visitados (blur)

// ---------- TODO 2 · Expresiones regulares (5g) ----------
const LETRAS = "A-Za-zÁÉÍÓÚÜÑáéíóúüñ";
const RE = {
	// TODO 2a: nombre → entre 2 y 5 palabras, solo letras, un espacio entre palabras
	nombre: `/^([${LETRAS}]+)([${LETRAS}]+) {1,4}$/`,
	// TODO 2b: password → al menos una minúscula, una mayúscula y un número, 8 o más caracteres
	password: /s/,
};

// ---------- TODO 3 · Mensajes propios (6e) ----------
const MENSAJES = {
	nombre: {
		valueMissing: "El nombre es obligatorio",
		tooShort: "El nombre debe tener al menos 4 caracteres",
	},
	email: {
		valueMissing: "El correo electrónico es obligatorio",
		typeMismatch: "Introduce un correo electrónico válido",
	},
	email2: {
		valueMissing: "Debes repetir el correo electrónico",
		typeMismatch: "Introduce un correo electrónico válido",
		customError: "Los correos electrónicos no coinciden",
	},
	genero: {
		valueMissing: "Debes seleccionar una opción",
	},
	password: {
		valueMissing: "La contraseña es obligatoria",
		tooShort: "La contraseña debe tener al menos 8 caracteres",
	},
	password2: {
		valueMissing: "Debes repetir la contraseña",
		customError: "Las contraseñas no coinciden",
	},
	intereses: {
		customError: "Debes seleccionar al menos 3 intereses",
	},
	terminos: {
		valueMissing: "Debes aceptar las condiciones",
	},
};
// ---------- TODO 4 · Selects dependientes (6e) ----------
function rellenarSelect(select, datos) {
	// TODO 4a: primera opción en blanco + una opción por dato (valor = código)
	const comunidadOptionDefault = document.createElement("option");
	comunidadOptionDefault.textContent = "Seleciona una opcion";
	select.appendChild(comunidadOptionDefault);
	datos.forEach((dato) => {
		const opcion = document.createElement("option");
		opcion.textContent = dato.nombre;
		opcion.value = dato.codigo;
		select.appendChild(opcion);
	});
}
rellenarSelect(comunidad, comunidades);

// TODO 4b: al cambiar comunidad → cargar provincias y vaciar municipios
comunidad.addEventListener("change", () => {
	municipio.textContent = "";
	provincia.textContent = "";
	const codComunidad = comunidad.value;
	const provinciasFiltradas = provincias.filter(
		(provinciaFilter) => codComunidad === provinciaFilter.comunidad,
	);
	provinciasFiltradas.forEach((datoProvincia) => {
		const opcion = document.createElement("option");
		opcion.textContent = datoProvincia.nombre;
		opcion.value = datoProvincia.codigo;
		provincia.appendChild(opcion);
	});
});
// TODO 4c: al cambiar provincia → cargar municipios

provincia.addEventListener("change", () => {
	municipio.textContent = "";
	const codProvincia = provincia.value;
	const municipiosFiltrados = municipios.filter(
		(municipioFilter) => codProvincia === municipioFilter.provincia,
	);
	municipiosFiltrados.forEach((datoMunicipio) => {
		const opcion = document.createElement("option");
		opcion.textContent = datoMunicipio.nombre;
		opcion.value = datoMunicipio.codigo;
		municipio.appendChild(opcion);
	});
});

// ---------- TODO 5 · Validación (5f) ----------
function validar(nombreCampo) {
	// TODO 5a: calcular error ('formato', 'duplicado', 'distintos', 'pocos'...) según el campo
	function mensajeDe(campo) {
		for (const err in MENSAJES) if (campo.validity[err]) return MENSAJES[err];
		return campo.validationMessage;
	}
	// TODO 5b: setCustomValidity(error), pintar la clase 'error' y el mensaje en el span
	// TODO 5c: devolver si el campo es válido (checkValidity)
	return true;
}

// ---------- TODO 6 · Eventos en vivo y validación cruzada (5d, 5f) ----------
// TODO 6a: blur → marcar como tocado y validar; input → validar solo si está tocado
// TODO 6b: al cambiar email → revalidar email2 si tiene valor (y lo mismo con password/password2)
// TODO 6c: radios, checkboxes y términos → validar en 'change'

// ---------- TODO 7 · Envío (6d, 6e) ----------
form.addEventListener("submit", (e) => {
	e.preventDefault();
	// TODO 7a: si el taller está completo, salir
	// TODO 7b: validar TODOS los campos; si hay errores, foco al primero y salir
	// TODO 7c: guardar la inscripción en el array, añadir la fila y mostrar confirmación
	// TODO 7d: reiniciar el formulario
});

// ---------- TODO 8 · Tabla con DOM y delegación (5d) ----------
function añadirFila(u) {
	// TODO 8a: crear <tr> y <td> con createElement / textContent (nada de innerHTML con datos)
	// TODO 8b: añadir un botón "Dar de baja" en la última celda
}
// TODO 8c: un único listener en el tbody que da de baja la fila del botón pulsado

// ---------- TODO 9 · Aforo y reinicio (6e) ----------
function actualizarAforo() {
	// TODO 9a: mostrar las plazas libres y deshabilitar el botón de enviar si no quedan
}
actualizarAforo();
// TODO 9b: al reiniciar, borrar clases 'error', textos de error y validaciones personalizadas
