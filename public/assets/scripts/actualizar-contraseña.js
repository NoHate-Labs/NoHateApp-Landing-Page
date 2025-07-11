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

// Validar email
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(email).toLowerCase());
}

// Cambiar contraseña
const formCambiarPassword = document.getElementById("form-cambiar-contraseña");
if (formCambiarPassword) {
  formCambiarPassword.addEventListener("submit", (event) => {
    event.preventDefault();

    const usuarioLogueado = obtenerUsuarioLogueado();
    if (!usuarioLogueado) {
      alert("No hay ningún usuario logueado");
      window.location.href = "login.html";
      return;
    }

    const passwordActual = formCambiarPassword.elements["pw-actual"].value;
    const nuevaPassword = formCambiarPassword.elements["pw-nuevo"].value;
    const confirmarPassword =
      formCambiarPassword.elements["pw-confirmar"].value;

    // Validaciones
    if (!passwordActual || !nuevaPassword || !confirmarPassword) {
      alert("Por favor, complete todos los campos");
      return;
    }

    if (passwordActual !== usuarioLogueado.password) {
      alert("La contraseña actual es incorrecta");
      return;
    }

    if (nuevaPassword !== confirmarPassword) {
      alert("Las nuevas contraseñas no coinciden");
      return;
    }

    if (nuevaPassword.length < 6) {
      alert("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Actualizar contraseña en la lista de usuarios
    const usuarios = obtenerUsuarios();
    const usuarioIndex = usuarios.findIndex(
      (user) => user.email === usuarioLogueado.email
    );

    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].password = nuevaPassword;
      guardarUsuarios(usuarios);

      // Actualizar usuario logueado
      usuarioLogueado.password = nuevaPassword;
      guardarUsuarioLogueado(usuarioLogueado);

      // Mostrar popup de confirmación
      document.getElementById("popup-confirmacion").style.display = "flex";

      // Limpiar formulario
      formCambiarPassword.reset();
    } else {
      alert("Error al actualizar la contraseña");
    }
  });
}
