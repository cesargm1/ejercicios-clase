"use strict";
/**
 * UP4_A3 · Validación estructurada y dinámica de formularios
 * Alumno/a: ____________________
 *
 * Ejercicio 1 se hace en index.html (atributos). Antes de empezar el Ejercicio 2,
 * comprueba que el navegador ya impide enviar el formulario con errores.
 */

const form = document.forms.registro;
const { nombre, email, edad, password, password2 } = form.elements;

// TODO (Ej. 2): desactiva la validación nativa del navegador para controlarla desde JS

form.addEventListener("submit", function (event) {
	event.preventDefault();
});

// =====================================================
// Ejercicio 2 · Expresiones regulares
// =====================================================

/** TODO: letras (con tildes y ñ) y un espacio entre palabras, sin espacios al principio ni al final. */
const RE_NOMBRE = /^[A-Z\u00d1]{1}[a-z\u00f1]+ [A-Z]{1}[a-z]+$/;
/** TODO: usuario@dominio.ext */
const RE_EMAIL = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.ext$/;
/** TODO: al menos una minúscula, una mayúscula y un número; mínimo 8 caracteres. */
const RE_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

// =====================================================
// Ejercicio 4 · Mensajes iguales en todos los navegadores
// =====================================================

/**
 * TODO: completa un mensaje propio para cada error posible de cada campo,
 * usando como clave el nombre de la propiedad de validity (valueMissing, tooShort, typeMismatch…).
 */
const MENSAJES = {
	nombre: {
		valueMissing: "El nombre es obligatorio",
		tooShort: "El nombre debe tener al menos 3 caracteres",
		typeMismatch: "Introduce un nombre válido",
	},
	email: {
		valueMissing: "El correo electrónico es obligatorio",
		typeMismatch: "Introduce una dirección de correo electrónico válida",
		tooShort: "El correo electrónico es demasiado corto",
	},
	edad: {
		valueMissing: "La edad es obligatoria",
		typeMismatch: "Introduce una edad válida",
		rangeUnderflow: "Debes tener al menos 18 años",
		rangeOverflow: "La edad introducida supera el límite permitido",
		stepMismatch: "Introduce una edad válida",
		badInput: "Introduce la edad utilizando números",
	},
	password: {
		valueMissing: "La contraseña es obligatoria",
		tooShort: "La contraseña debe tener al menos 8 caracteres",
		tooLong: "La contraseña es demasiado larga",
		patternMismatch: "La contraseña debe cumplir los requisitos de seguridad",
	},
	password2: {
		valueMissing: "Debes repetir la contraseña",
		tooShort: "La contraseña debe tener al menos 8 caracteres",
		tooLong: "La contraseña es demasiado larga",
		patternMismatch: "La contraseña no cumple los requisitos",
	},
};

/**
 * TODO: devuelve el mensaje propio del primer error activo de campo.validity,
 * o campo.validationMessage si no hay ninguno propio.
 * @param {HTMLInputElement} campo
 * @returns {string}
 */
function mensajeDe(campo) {
	for (const err in MENSAJES) if (campo.validity[err]) return MENSAJES[err];
	return campo.validationMessage;
}

// =====================================================
// Ejercicio 2 · Validación de cada campo
// =====================================================

/**
 * TODO: aplica con setCustomValidity() las reglas que no caben en atributos HTML:
 *  - nombre, email y password deben cumplir su expresión regular;
 *  - password2 debe ser igual que password.
 * Después llama a pintar(campo) y devuelve si el campo es válido.
 * @param {HTMLInputElement} campo
 * @returns {boolean}
 */
function validarCampo(campo) {
	const name = campo.name;
	campo.setCustomValidity("");

	if (name === "nombre") {
		if (!RE_NOMBRE.test(campo.value)) {
			campo.setCustomValidity("El nombre no tiene un formato válido.");
		}
		pintar(campo);
		return campo.validity.valid;
	}

	if (name === "email") {
		if (!RE_EMAIL.test(campo.value)) {
			campo.setCustomValidity("El correo electrónico no es válido.");
		}
		pintar(campo);
		return campo.validity.valid;
	}

	if (name === "password") {
		if (!RE_PASSWORD.test(campo.value)) {
			campo.setCustomValidity("La contraseña no cumple los requisitos.");
		}
		pintar(campo);
		return campo.validity.valid;
	}

	if (password.value !== password2.value) {
		campo.setCustomValidity("Las contraseñas no coinciden.");
	}
}

/**
 * TODO (validación cruzada): al cambiar la contraseña, valida la contraseña
 * y, si ya tiene algo escrito, también su repetición.
 */
function validarPasswords() {
	// TODO

	const igual = password.value === password2.value;
	password2.setCustomValidity(igual ? "" : "No coinciden");
	pintar(password);
	pintar(password2);
}

// =====================================================
// Ejercicio 3 · Refuerzo visual
// =====================================================

/**
 * TODO: pon la clase "valido" o "invalido" en el campo (los estilos ya están en estilos.css),
 * actualiza aria-invalid y escribe en el <span class="feedback"> siguiente «✓» o el mensaje de error.
 * @param {HTMLInputElement} campo
 */
function pintar(campo) {
	const feedback = campo.nextElementSibling;

	if (campo.validity.valid) {
		campo.classList.add("valido");
		campo.classList.remove("invalido");
		feedback.textContent = "✓";
	} else {
		campo.classList.add("invalido");
		campo.classList.remove("valido");
		feedback.textContent = campo.validationMessage;
	}
}

// =====================================================
// Eventos
// =====================================================

// TODO: validación en vivo de nombre, email y edad al salir del campo (blur) y, a partir de entonces, en cada input.
// TODO: password → validarPasswords en cada input; password2 → validarCampo en cada input.

// TODO: submit → evita el envío, valida TODOS los campos y:
//         - si todo es válido, muestra #confirmacion con el nombre y el correo y reinicia el formulario;
//         - si no, pon el foco en el primer campo con error.

const botonSubmit = document.querySelector('button[type="submit"]');

const botonReset = document.querySelector('button[type="reset"]');

botonSubmit.addEventListener("click", function (event) {
	const confirmacion = document.getElementById("confirmacion");
	event.preventDefault();
	if (validarCampo()) {
		const name = document.getElementById("nombre");
		const email = document.getElementById("email");

		confirmacion.textContent = `nombre:${name} correo: ${email}`;
		form.reset();
	} else {
		const PrimerInputInvalido = document.querySelector(".invalido");
		PrimerInputInvalido.focus();
	}
});
// TODO: reset → elimina mensajes, clases, aria-invalid y errores personalizados.
form.addEventListener("reset", function () {
	Array.from(form.elements).forEach((input) => {
		input.classList.remove("error");
		input.removeAttribute("aria-invalid");
		input.setCustomValidity("");
	});
});
/*
 * RESPUESTAS Ej. 4 (6f) · Abre la página en dos navegadores (o cambia el idioma del navegador) con
 * MENSAJES vacío y anota qué devuelve validationMessage para un campo obligatorio vacío.
 * ¿Por qué conviene usar mensajes propios?
 */
