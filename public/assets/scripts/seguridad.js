// Funciones para manejo de usuarios
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

function eliminarUsuario(email) {
  const usuarios = obtenerUsuarios();
  const usuariosFiltrados = usuarios.filter((user) => user.email !== email);
  guardarUsuarios(usuariosFiltrados);
}

function limpiarFormularioPassword() {
  const inputs = document.querySelectorAll('input[type="password"]');
  inputs.forEach((input) => (input.value = ""));
}

function limpiarConfirmarTexto() {
  const inputConfirmar = document.getElementById("confirmarTexto");
  if (inputConfirmar) {
    inputConfirmar.value = "";
  }
}

// === CAMBIO DE CONTRASEÑA ===
const formCambio = document.getElementById("form-cambiar-contraseña");
const popupCambio = document.getElementById("popup-confirmacion");

if (formCambio) {
  formCambio.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuarioLogueado = obtenerUsuarioLogueado();
    if (!usuarioLogueado) {
      alert("No hay ningún usuario logueado");
      window.location.href = "login.html";
      return;
    }

    const actual = formCambio.querySelector('input[name="pw-actual"]').value;
    const nueva = formCambio.querySelector('input[name="pw-nuevo"]').value;
    const confirmar = formCambio.querySelector(
      'input[name="pw-confirmar"]'
    ).value;

    if (!actual || !nueva || !confirmar) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Verificar contraseña actual
    if (actual !== usuarioLogueado.password) {
      alert("La contraseña actual es incorrecta");
      return;
    }

    // Verificar que las nuevas contraseñas coinciden
    if (nueva !== confirmar) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    }

    if (nueva.length < 6) {
      alert("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Actualizar contraseña en la lista de usuarios
    const usuarios = obtenerUsuarios();
    const usuarioIndex = usuarios.findIndex(
      (user) => user.email === usuarioLogueado.email
    );

    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].password = nueva;
      guardarUsuarios(usuarios);

      // Actualizar usuario logueado
      usuarioLogueado.password = nueva;
      guardarUsuarioLogueado(usuarioLogueado);

      popupCambio.style.display = "flex";
      limpiarFormularioPassword();
    } else {
      alert("Error al actualizar la contraseña");
    }
  });
}

// === ELIMINACIÓN DE CUENTA ===
const btnEliminar = document.getElementById("btn-eliminar");
const popupEliminar = document.getElementById("popup-eliminar");
const btnConfirmarEliminar = document.getElementById("confirmarEliminar");
const btnCancelarEliminar = document.getElementById("cancelarEliminar");

if (btnEliminar) {
  btnEliminar.addEventListener("click", function () {
    popupEliminar.style.display = "flex";
    limpiarFormularioPassword();
  });
}

if (btnConfirmarEliminar) {
  btnConfirmarEliminar.addEventListener("click", function () {
    const texto = document.getElementById("confirmarTexto").value.trim();
    if (texto === "CONFIRMAR") {
      const usuarioLogueado = obtenerUsuarioLogueado();
      if (usuarioLogueado) {
        // Eliminar usuario de la lista
        eliminarUsuario(usuarioLogueado.email);

        // Cerrar sesión
        localStorage.removeItem("usuarioLogueado");

        alert("Cuenta eliminada permanentemente.");

        // Redirigir a index
        window.location.href = "index.html";
      }
    } else {
      alert('Debes escribir la palabra "CONFIRMAR" exactamente.');
    }
  });
}

if (btnCancelarEliminar) {
  btnCancelarEliminar.addEventListener("click", function () {
    popupEliminar.style.display = "none";
    limpiarConfirmarTexto();
  });
}

// === VINCULAR CUENTA GOOGLE ===
const btnVincular = document.getElementById("btn-vincular");
const popupVincular = document.getElementById("popup-vincular");

if (btnVincular) {
  btnVincular.addEventListener("click", function () {
    const usuarioLogueado = obtenerUsuarioLogueado();
    if (usuarioLogueado) {
      // Actualizar estado de vinculación
      const usuarios = obtenerUsuarios();
      const usuarioIndex = usuarios.findIndex(
        (user) => user.email === usuarioLogueado.email
      );

      if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].cuentaGoogleVinculada = true;
        guardarUsuarios(usuarios);

        usuarioLogueado.cuentaGoogleVinculada = true;
        guardarUsuarioLogueado(usuarioLogueado);
      }
    }

    popupVincular.style.display = "flex";
    limpiarFormularioPassword();
  });
}

// Cerrar popups
document.querySelectorAll(".boton-cerrar").forEach((btn) => {
  btn.addEventListener("click", function () {
    const popupCambio = document.getElementById("popup-confirmacion");
    const popupVincular = document.getElementById("popup-vincular");
    if (popupCambio) popupCambio.style.display = "none";
    if (popupVincular) popupVincular.style.display = "none";
  });
});

// Verificar que hay usuario logueado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogueado = obtenerUsuarioLogueado();
  if (!usuarioLogueado) {
    alert("Debe iniciar sesión para acceder a esta página");
    window.location.href = "login.html";
  }
});
