/**
 * UP4_A4 · Formulario web con validación y manejo del DOM
 * Alumno/a: ____________________
 *
 * Es un módulo ES (type="module"): ábrelo con Live Server.
 * Antes de programar, completa UP4A4.html: name, type y atributos de validación de cada campo,
 * value en radios y checkboxes, y type="submit"/"reset" en los botones.
 */
import { comunidades } from "./UP4A4-comunidades.js";
import { provincias } from "./UP4A4-provincias.js";
import { municipios } from "./UP4A4-municipios.js";

const form = document.getElementById("user-form");
const tbody = document.querySelector("#users-list tbody");

/** Usuarios registrados (array interno). */
const usuarios = [];

// =====================================================
// 1. Expresiones regulares
// =====================================================
// TODO: nombre (2 a 5 palabras, solo letras, sin espacios sobrantes), DNI (12345678-X),
//       teléfono (000-00-00-00), usuario (empieza por letra o número, admite - . _, no acaba en símbolo), CP (00000)

// =====================================================
// 2. Mensajes personalizados por campo y tipo de error (valueMissing, tooShort, typeMismatch, customError…)
// =====================================================
// TODO

// =====================================================
// 3. Selects dependientes
// =====================================================
/**
 * TODO: rellena un <select> con una primera opción en blanco y una <option> por dato (value = código).
 * @param {HTMLSelectElement} select
 * @param {{codigo: string, nombre: string}[]} datos
 */
function rellenarSelect(select, datos) {
	const opcion = document.createElement("option");
	opcion.textContent = "Selecciona una opción";
	select.appendChild(opcion);
	datos.forEach((dato) => {
		const opcion = document.createElement("option");
		opcion.value = dato.codigo;
		opcion.textContent = dato.nombre;
		select.appendChild(opcion);
	});
}
// TODO: carga las comunidades al iniciar.

document.addEventListener("DOMContentLoaded", () => {
	const comunidad = document.getElementById("comunidad");
	rellenarSelect(comunidad, comunidades);
});

// TODO: al cambiar la comunidad → carga sus provincias y vacía los municipios.
// TODO: al cambiar la provincia → carga sus municipios.

// =====================================================
// 4. Validación
// =====================================================
// TODO: función que valide un campo (o el grupo de radios/checkboxes), aplique setCustomValidity
//       cuando haga falta y muestre el mensaje en su <span class="error-text">.
// TODO: tiempo real → DNI y teléfono en "change"; email en "input" (y revalida la repetición).
// TODO: «Repetir email» no permite pegar.

// =====================================================
// 5. Envío y reinicio
// =====================================================
// TODO: submit → evita el envío y valida todo. Si todo es correcto, guarda el usuario en `usuarios`
//       (dirección postal por CÓDIGO), añade una fila a la tabla creando los nodos con el DOM y reinicia el formulario.
// TODO: reset → elimina mensajes, clases y errores personalizados, y vacía provincias y municipios.
