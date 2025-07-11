// Función para mostrar el modal
const botonHamburguesa = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu-horizontal");
botonHamburguesa?.addEventListener("click", () => {
  menu.classList.toggle("active");
});

function obtenerUsuarioLogueado() {
  const usuario = localStorage.getItem("usuarioLogueado");
  return usuario ? JSON.parse(usuario) : null;
}

function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "index.html";
}

// Función para mostrar usuario logueado en el menú
function mostrarUsuarioLogueado() {
  const usuario = obtenerUsuarioLogueado();
  const menuHorizontal = document.querySelector(".menu-horizontal");

  if (usuario && menuHorizontal) {
    // Buscar el enlace de "Inicia Sesión"
    const loginLink = menuHorizontal.querySelector('a[href="login.html"]');

    if (loginLink) {
      // Reemplazar con información del usuario
      loginLink.innerHTML = `${usuario.nombre}`;
      loginLink.href = "datos-perfil.html";

      // Agregar opción de cerrar sesión
      const cerrarSesionLi = document.createElement("li");
      const cerrarSesionLink = document.createElement("a");
      cerrarSesionLink.href = "#";
      cerrarSesionLink.textContent = "Cerrar Sesión";
      cerrarSesionLink.addEventListener("click", (e) => {
        e.preventDefault();
        cerrarSesion();
      });
      cerrarSesionLi.appendChild(cerrarSesionLink);
      menuHorizontal.appendChild(cerrarSesionLi);
    }
  }
}

//funcion para mostrar el año actual en el footer
function mostrarAnioActual() {
  const anioElement = document.getElementById("anio");
  if (anioElement) {
    const fecha = new Date();
    const anioActual = fecha.getFullYear();
    anioElement.textContent = anioActual;
  }
}

//validar email
function validateEmail(femail1) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(femail1).toLowerCase());
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarAnioActual();
  mostrarUsuarioLogueado();
});