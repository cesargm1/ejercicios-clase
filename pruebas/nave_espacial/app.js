document.addEventListener("DOMContentLoaded", () => {
	const energiaSpam = document.getElementById("energia");
	const estado = document.getElementById("estado");

	const nave = {
		energia: parseInt(energiaSpam.textContent),
		estado: estado.textContent,
	};
	if (Number.isNaN(nave.energia) === true) {
		nave.energia = 100;
	}
	sessionStorage.setItem("energia", JSON.stringify(nave));
	// ### 2. Elementos del DOM

	const barra = document.getElementById("barra-progreso");
	const usar = document.querySelector(".btn-usar");
	const recargar = document.querySelector(".btn-recargar");

	// ### 3. Actualización de pantalla

	const actualizar = () => {
		barra.style.width = nave.energia + "%";
		energiaSpam.textContent = nave.energia + " %";
		estado.textContent = nave.estado;
	};
	actualizar();

	recargar.addEventListener("click", () => {
		if (nave.energia > 90) {
			return alert("no puedes recargar mas");
		} else {
			nave.energia = nave.energia + 10;
			actualizar();
			sessionStorage.setItem("energia", JSON.stringify(nave.energia));
		}
	});

	usar.addEventListener("click", () => {
		if (nave.energia < 10) {
			return alert("no puedes usar energia");
		} else {
			nave.energia = nave.energia - 10;
			actualizar();
			sessionStorage.setItem("energia", JSON.stringify(nave.energia));
		}
	});
});
