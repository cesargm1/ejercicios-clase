// ======================================
// UP4_A5 - Persistencia de datos
// ======================================

// EJERCICIO 1 - Guardar y recuperar clientes

// Guardar la lista en localStorage usando JSON.
// Recuperar los datos al cargar la página.
const userForm = document.getElementById("user-form");
userForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const lista = [
		{
			name: "Maria",
			dni: "maria@mail.com",
			phone: "111",
			email: "@",
			userName: "a",
		},
	];
	localStorage.setItem("clientes", JSON.stringify(lista));
});

document.addEventListener("DOMContentLoaded", function () {
	const userSave = localStorage.getItem("clientes");

	if (userSave) {
		const userData = JSON.parse(userSave);
		userData.forEach((user) => {});
	}
});

// EJERCICIO 2 - Lectura segura
// Controlar errores con try/catch.
// Crear la función guardarLista(lista).

// EJERCICIO 3 - Contador de visitas
// Usar sessionStorage para contar las visitas
// durante la sesión actual.

// EJERCICIO 4 - Sincronización entre pestañas
// Escuchar el evento storage y actualizar la tabla
// cuando cambien los clientes desde otra pestaña.

// EJERCICIO 5 - Login
// Guardar el usuario y la fecha en sessionStorage.
// Permitir cerrar sesión.

// EJERCICIO 6 - Cookies
// Guardar las preferencias en localStorage.
// No volver a mostrar el banner si ya hay una decisión.
