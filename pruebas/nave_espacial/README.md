# 🚀 UP4_A6 · Control de energía de una nave espacial

**Alumno/a:** ********\_\_\_\_********

## 📌 Descripción

En esta práctica vamos a desarrollar un panel de control para gestionar la energía de una nave espacial.

El sistema permitirá consumir y recargar energía, mostrando en todo momento el nivel disponible y recordando su valor durante la sesión del navegador mediante `sessionStorage`.

## 🎯 Objetivos

- Practicar el manejo del DOM.
- Trabajar con eventos `addEventListener()`.
- Utilizar `sessionStorage`.
- Comprender el funcionamiento de `getItem()` y `setItem()`.
- Practicar condiciones `if / else`.
- Crear y utilizar funciones.
- Actualizar elementos HTML desde JavaScript.

## 📝 Apartados de la práctica

### 1. Recuperación de energía

- Recuperar el nivel de energía almacenado.
- Si no existe ningún valor, establecerlo en 100.
- Convertir el valor recuperado al tipo de dato adecuado.

### 2. Elementos del DOM

- Obtener los elementos necesarios del HTML.
- Identificar los botones y los elementos que muestran la energía.

### 3. Actualización de pantalla

- Mostrar el nivel actual de energía.
- Actualizar la barra de progreso.
- Mostrar el estado de la nave.

### 4. Consumo de energía

- Añadir un evento al botón de consumo.
- Restar 10 puntos de energía.
- Evitar que la energía sea inferior a 0.
- Actualizar la pantalla y guardar el nuevo valor.

### 5. Recarga de energía

- Añadir un evento al botón de recarga.
- Sumar 10 puntos de energía.
- Evitar que la energía supere los 100 puntos.
- Actualizar la pantalla y guardar el nuevo valor.

### 6. Estado de la nave

- Detectar cuándo la energía llega a 0.
- Mostrar un mensaje de nave sin energía.
- Actualizar el mensaje cuando vuelva a tener energía.

### 7. Almacenamiento

- Guardar los cambios en `sessionStorage`.
- Recuperar la energía al recargar la página.
- Comprobar que los datos dejan de conservarse al finalizar la sesión.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- DOM
- Web Storage API (`sessionStorage`)

## 🏁 Resultado esperado

Un panel interactivo de control espacial donde el usuario pueda gestionar la energía de su nave, consultar su estado y conservar el nivel de energía mientras dure la sesión del navegador.

## 📂 Archivos del proyecto

- `index.html` — Estructura de la aplicación.
- `styles.css` — Diseño visual del panel.
- `script.js` — Lógica y funcionamiento de la nave.
