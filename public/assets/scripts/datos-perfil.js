function obtenerUsuarios() {
  const usuarios = localStorage.getItem("usuariosRegistrados");
  return usuarios ? JSON.parse(usuarios) : [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
}

function obtenerUsuarioLogueado() {
  const usuario = localStorage.getItem("usuarioLogueado");
  return usuario ? JSON.parse(usuario) : null;
}

function guardarUsuarioLogueado(usuario) {
  localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
}

function limpiarFormulario() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}

const formDatosPerfil = document.querySelector(".form-datos-perfil");
const datosPerfil = document.querySelector(".datos-perfil");
const btnModificarDatos = document.getElementById("btn-modificar-datos");
const btnConfirmar = document.getElementById("btn-confirmar");
const popupConfirmacion = document.getElementById("popup-confirmacion");

// Evento para mostrar formulario al hacer click en "Modificar datos"
btnModificarDatos.addEventListener("click", function () {
  // Mostrar formulario y botón confirmar
  formDatosPerfil.style.display = "flex";
  btnConfirmar.style.display = "block";

  // Ocultar datos y botón modificar
  datosPerfil.style.display = "none";
  btnModificarDatos.style.display = "none";
});

// Evento para validar y confirmar cambios
btnConfirmar.addEventListener("click", function () {
  // Obtener valores del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
  const apellidoPaterno = document
    .getElementById("apellido-paterno")
    .value.trim();
  const apellidoMaterno = document
    .getElementById("apellido-materno")
    .value.trim();

  // Validar que todos los campos estén llenos
  if (
    !nombre ||
    !correo ||
    !fechaNacimiento ||
    !apellidoPaterno ||
    !apellidoMaterno
  ) {
    alert("Por favor, complete todos los campos antes de continuar.");
    return;
  }

  // Confirmación antes de guardar
  if (confirm("¿Está seguro de que desea guardar los cambios?")) {
    // Mostrar popup de confirmación
    popupConfirmacion.style.display = "flex";

    // Volver al estado inicial
    formDatosPerfil.style.display = "none";
    btnConfirmar.style.display = "none";
    datosPerfil.style.display = "flex";
    btnModificarDatos.style.display = "block";
    // Actualizar usuario logueado y lista de usuarios
    const usuarioLogueado = obtenerUsuarioLogueado();
    if (usuarioLogueado) {
      usuarioLogueado.nombre = nombre;
      usuarioLogueado.email = correo;
      usuarioLogueado.fechaNacimiento = fechaNacimiento;
      usuarioLogueado.apellidop = apellidoPaterno;
      usuarioLogueado.apellidom = apellidoMaterno;
      guardarUsuarioLogueado(usuarioLogueado);

      const usuarios = obtenerUsuarios();
      const idx = usuarios.findIndex((u) => u.email === usuarioLogueado.email);
      if (idx !== -1) {
      usuarios[idx] = usuarioLogueado;
      guardarUsuarios(usuarios);
      }
    }
    mostrarDatosUsuario();
  }
});

function mostrarDatosUsuario() {
  const usuario = obtenerUsuarioLogueado();
  if (usuario) {
    document.getElementById("nombre").value = usuario.nombre || "";
    document.getElementById("apellido-paterno").value = usuario.apellidop || "";
    document.getElementById("apellido-materno").value = usuario.apellidom || "";
    document.getElementById("correo").value = usuario.email || "";
    document.getElementById("fecha-nacimiento").value =
      usuario.fechaNacimiento || "";

    document.getElementById("texto-nombre").textContent = usuario.nombre || "";
    document.getElementById("texto-correo").textContent = usuario.email || "";
    document.getElementById("texto-fecha-nacimiento").textContent =
      usuario.fechaNacimiento
        ? (() => {
            const d = new Date(usuario.fechaNacimiento);
            const day = String(d.getUTCDate()).padStart(2, "0");
            const month = String(d.getUTCMonth() + 1).padStart(2, "0");
            const year = d.getUTCFullYear();
            return `${day}/${month}/${year}`;
          })()
        : "";
    document.getElementById("texto-apellido-paterno").textContent =
      usuario.apellidop || "";
    document.getElementById("texto-apellido-materno").textContent =
      usuario.apellidom || "";
  }
}

mostrarDatosUsuario();

// Cerrar popup
document.querySelector(".boton-cerrar").addEventListener("click", function () {
  popupConfirmacion.style.display = "none";
});
