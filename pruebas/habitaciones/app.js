// UTILIDADES

// TODO: Crea una función validarEntero(valor) que compruebe
// que el valor es un número entero positivo.

const validarEntero = (entero) => {
	if (entero > 0 && Number.isInteger(entero)) {
		return "Numero valido";
	} else {
		return "Invalido";
	}
};

console.log(validarEntero(7));

// CLASE HABITACION

// TODO: Crea una clase Habitacion con las propiedades:
// id, nombre, precio, estado y cliente.
//
class Habitacion {
	constructor(id, nombre, precio, estado, cliente) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.estado = estado;
		this.cliente = cliente;
	}
	ocupar(nombreCliente) {
		if (this.estado === "ocupada") {
			return `la habitacion numero${this.id} es una habitacion ${this.nombre} ahora mismo esta ocupada por ${nombreCliente} `;
		} else {
			this.estado = "ocupada";
			return `la habitacion numero${this.id} es una habitacion ${this.nombre} ahora mismo esta libre `;
		}
	}
	liberar() {
		return `Coche: ${this.marca} ${this.modelo}`;
	}

	descripcion() {
		return `Coche: ${this.marca} ${this.modelo}`;
	}
}
// TODO: Añade los métodos:
// ocupar(nombreCliente)
// liberar()
// descripcion()

// LOCALSTORAGE

// TODO: Crea las funciones necesarias para guardar y recuperar
// las habitaciones desde localStorage.

// CARGA INICIAL

// TODO: Comprueba si hay habitaciones guardadas en localStorage.
// Si existen, cárgalas.
// Si no existen, realiza un fetch a habitaciones.json.
// Convierte los datos recibidos en objetos Habitacion.

// LOGIN

// TODO: Comprueba las credenciales.
// Usuario: admin
// Contraseña: 1234
//
// TODO: Si son correctas, oculta el login y muestra la gestión.
// Guarda la sesión en localStorage.
// Muestra si existe una sesión anterior.

// AÑADIR HABITACIÓN

// TODO: Recoge los datos del formulario.
// Comprueba que el ID sea válido y no esté repetido.
// Comprueba que el nombre no esté vacío.
// Comprueba que el precio sea positivo.
// Añade la habitación y guarda los cambios.

// RENDER

// TODO: Muestra todas las habitaciones en tarjetas dentro de #panel.
// Las habitaciones libres deben aparecer en verde.
// Las habitaciones ocupadas deben aparecer en rojo.
// Muestra los datos y los botones correspondientes.

// OCUPAR / LIBERAR

// TODO: Permite ocupar una habitación libre.
// Solicita el nombre del cliente.
// Actualiza el estado y guarda los cambios.
//
// TODO: Permite liberar una habitación ocupada.
// Actualiza el estado y guarda los cambios.

// MENSAJES

// TODO: Muestra mensajes de éxito y error en #mensaje.

// ESTADÍSTICAS

// TODO: Utiliza filter() para obtener las habitaciones ocupadas.
// TODO: Utiliza map() para obtener los nombres.
// TODO: Utiliza some() para comprobar si hay habitaciones libres.
// TODO: Utiliza every() para comprobar si todas están libres.
// TODO: Utiliza reduce() para calcular el precio medio.
// TODO: Muestra los resultados en #estadisticasBox.

// RECARGAR JSON

// TODO: Al pulsar #btnRecargar, vuelve a cargar los datos
// desde habitaciones.json.
// Actualiza localStorage y vuelve a renderizar las tarjetas.

cargarInicial();
