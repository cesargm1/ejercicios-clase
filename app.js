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
const confirmacion = document.getElementById("confirmacion");

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
	nombre: { valueMissing: "El nombre es obligatorio" /* , … */ },
	email: {},
	edad: {},
	password: {},
	password2: {},
};

/**
 * TODO: devuelve el mensaje propio del primer error activo de campo.validity,
 * o campo.validationMessage si no hay ninguno propio.
 * @param {HTMLInputElement} campo
 * @returns {string}
 */
function mensajeDe(campo) {
	// TODO
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
	// TODO
}

/**
 * TODO (validación cruzada): al cambiar la contraseña, valida la contraseña
 * y, si ya tiene algo escrito, también su repetición.
 */
function validarPasswords() {
	// TODO
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
	// TODO
}

// =====================================================
// Eventos
// =====================================================

// TODO: validación en vivo de nombre, email y edad al salir del campo (blur) y, a partir de entonces, en cada input.
// TODO: password → validarPasswords en cada input; password2 → validarCampo en cada input.
// TODO: submit → evita el envío, valida TODOS los campos y:
//         - si todo es válido, muestra #confirmacion con el nombre y el correo y reinicia el formulario;
//         - si no, pon el foco en el primer campo con error.
// TODO: reset → elimina mensajes, clases, aria-invalid y errores personalizados.

/*
 * RESPUESTAS Ej. 4 (6f) · Abre la página en dos navegadores (o cambia el idioma del navegador) con
 * MENSAJES vacío y anota qué devuelve validationMessage para un campo obligatorio vacío.
 * ¿Por qué conviene usar mensajes propios?
 */
