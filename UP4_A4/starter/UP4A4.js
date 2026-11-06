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
const dni = document.getElementById("dni");
const nombreApellidos = document.getElementById("nombreApellidos");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const cp = document.getElementById("cp");
const email = document.getElementById("email");
const email2 = document.getElementById("email2");
const usuario = document.getElementById("usuario");
const tbody = document.querySelector("#users-list tbody");

/** Usuarios registrados (array interno). */
const usuarios = [];

// =====================================================
// 1. Expresiones regulares
// =====================================================
// TODO: nombre (2 a 5 palabras, solo letras, sin espacios sobrantes), DNI (12345678-X),
//       teléfono (000-00-00-00), usuario (empieza por letra o número, admite - . _, no acaba en símbolo), CP (00000)

const nombreRex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+){1,4}$/;
const dniRex = /^\d{8}-[A-Za-z]$/;
const teléfonoRex = /^\d{3}-\d{2}-\d{2}-\d{2}$/;
const usuarioRex = /^[A-Za-z0-9][A-Za-z0-9._-]*[A-Za-z0-9]$|^[A-Za-z0-9]$/;
const cpRex = /^\d{5}$/;

// =====================================================
// 2. Mensajes personalizados por campo y tipo de error (valueMissing, tooShort, typeMismatch, customError…)
// =====================================================
// TODO

const mensajes = [
	{
		field: "NombreApellidos",
		valueMissing: "Introduce tu nombre y apellidos.",
		tooShort: "El nombre y los apellidos son demasiado cortos.",
		typeMismatch: "Introduce un nombre válido.",
	},
	{
		field: "DNI",
		valueMissing: "Introduce tu DNI.",
		tooShort: "El DNI debe tener 9 caracteres.",
		typeMismatch: "El DNI no tiene un formato válido.",
	},
	{
		field: "Telefono",
		valueMissing: "Introduce tu número de teléfono.",
		tooShort: "El teléfono es demasiado corto.",
		typeMismatch: "Introduce un teléfono válido.",
	},
	{
		field: "Genero",
		valueMissing: "Selecciona una opción de género.",
		tooShort: "",
		typeMismatch: "",
	},
	{
		field: "Direccion",
		valueMissing: "Introduce tu dirección.",
		tooShort: "La dirección es demasiado corta.",
		typeMismatch: "",
	},
	{
		field: "CP",
		valueMissing: "Introduce tu código postal.",
		tooShort: "El código postal debe tener 5 números.",
		typeMismatch: "El código postal no es válido.",
	},
	{
		field: "NombreUsuario",
		valueMissing: "Introduce un nombre de usuario.",
		tooShort: "El nombre de usuario debe tener más caracteres.",
		typeMismatch: "",
	},
	{
		field: "Email",
		valueMissing: "Introduce tu correo electrónico.",
		tooShort: "El correo electrónico es demasiado corto.",
		typeMismatch: "Introduce un correo electrónico válido.",
	},
	{
		field: "RepetirEmail",
		valueMissing: "Repite tu correo electrónico.",
		tooShort: "El correo electrónico es demasiado corto.",
		typeMismatch: "Introduce un correo electrónico válido.",
	},
];

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
const provinciaSelect = document.getElementById("provincia");
const comunidadesSelect = document.getElementById("comunidad");
const municipiosSelect = document.getElementById("municipio");

document.addEventListener("DOMContentLoaded", () => {
	const select = document.getElementById("comunidad");
	rellenarSelect(select, comunidades);
});

// TODO: al cambiar la comunidad → carga sus provincias y vacía los municipios.
comunidadesSelect.addEventListener("change", () => {
	const comunidad = comunidadesSelect.value;
	const provinciasFiltradas = provincias.filter(
		(provincia) => provincia.comunidad === comunidad,
	);
	provinciaSelect.innerHTML = "";
	rellenarSelect(provinciaSelect, provinciasFiltradas);
});
// TODO: al cambiar la provincia → carga sus municipios.

provinciaSelect.addEventListener("change", () => {
	const provincia = provinciaSelect.value;
	const municipiosFiltrados = municipios.filter(
		(municipio) => municipio.provincia === provincia,
	);
	municipiosSelect.innerHTML = "";
	rellenarSelect(municipiosSelect, municipiosFiltrados);
});

// =====================================================
// 4. Validación
// =====================================================
// TODO: función que valide un campo (o el grupo de radios/checkboxes), aplique setCustomValidity
//       cuando haga falta y muestre el mensaje en su <span class="error-text">.

const validarCampo = (campo) => {
	let valido = true;
	let mensaje = "";

	if (campo.type === "radio" || campo.type === "checkbox") {
		const grupo = document.querySelectorAll(`[name="${campo.name}"]`);

		if (campo.required) {
			const algunoMarcado = [...grupo].some((el) => el.checked);

			if (!algunoMarcado) {
				valido = false;
				mensaje = "Debes seleccionar una opción.";
			}
		}

		grupo.forEach((el) => el.setCustomValidity(mensaje));
	} else {
		campo.setCustomValidity("");

		if (!campo.validity.valid) {
			valido = false;
			mensaje = campo.validationMessage;
		}
	}

	// Mostrar el mensaje de error
	const contenedor = campo.closest(".form-group");
	const errorText = contenedor?.querySelector(".error-text");

	if (errorText) {
		errorText.textContent = mensaje;
	}

	return valido;
};
// TODO: tiempo real → DNI y teléfono en "change"; email en "input" (y revalida la repetición).

dni.addEventListener("change", () => {
	validarCampo(dni);
});

telefono.addEventListener("change", () => {
	validarCampo(telefono);
});

email.addEventListener("input", () => {
	validarCampo(email);
	validarCampo(email2);
});

// TODO: «Repetir email» no permite pegar.

email2.addEventListener("paste", (e) => {
	e.preventDefault();
});

// =====================================================
// 5. Envío y reinicio
// =====================================================
// TODO: submit → evita el envío y valida todo. Si todo es correcto, guarda el usuario en `usuarios`

const campos = form.querySelectorAll("input, select");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const genero = document.querySelector('input[name="genero"]:checked')?.value;

	let valid = true;

	campos.forEach((campo) => {
		if (!validarCampo(campo)) {
			valid = false;
		}
	});
	email2.setCustomValidity("");
	if (email.value !== email2.value) {
		email2.setCustomValidity("Los correos electrónicos no coinciden.");
		validarCampo(email2);
		valid = false;
	}

	if (valid) {
		const guardarUsuario = {
			nombreApellidos: nombreApellidos.value,
			usuario: usuario.value,
			dni: dni.value,
			direccion: direccion.value,
			cp: cp.value,
			telefono: telefono.value,
			email: email.value,
			genero: genero,
		};
		usuarios.push(guardarUsuario);

		usuarios.forEach((usuario) => {
			const tr = document.createElement("tr");
			const tdNombreApellidos = document.createElement("td");
			const tdDni = document.createElement("td");
			const tdUsuario = document.createElement("td");
			const tdEmail = document.createElement("td");

			tdNombreApellidos.textContent = usuario.nombreApellidos;
			tdDni.textContent = usuario.dni;
			tdUsuario.textContent = usuario.usuario;
			tdEmail.textContent = usuario.email;

			tr.appendChild(tdNombreApellidos);
			tr.appendChild(tdDni);
			tr.appendChild(tdUsuario);
			tr.appendChild(tdEmail);
			tbody.appendChild(tr);
		});
	}
});
//       (dirección postal por CÓDIGO), añade una fila a la tabla creando los nodos con el DOM y reinicia el formulario.
// TODO: reset → elimina mensajes, clases y errores personalizados, y vacía provincias y municipios.
