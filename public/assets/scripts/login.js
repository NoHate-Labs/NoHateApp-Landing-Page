// Funciones para manejo de usuarios
function obtenerUsuarios() {
  const usuarios = localStorage.getItem("usuariosRegistrados");
  return usuarios ? JSON.parse(usuarios) : [];
}

function guardarUsuarioLogueado(usuario) {
  localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
}

// Función para validar el inicio de sesión
function iniciarSesion(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Por favor, complete todos los campos");
    return;
  }

  // Buscar usuario en la lista de registrados
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(
    (user) => user.email === email && user.password === password
  );

  if (usuario) {
    // Guardar usuario logueado
    guardarUsuarioLogueado(usuario);
    alert("¡Inicio de sesión exitoso!");
    window.location.href = "index.html";
  } else {
    alert("Correo o contraseña incorrectos.");
  }
}

// Asociar eventos
document.getElementById("loginForm")?.addEventListener("submit", iniciarSesion);
