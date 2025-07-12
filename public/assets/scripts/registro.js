// Funciones para manejo de usuarios
function obtenerUsuarios() {
  const usuarios = localStorage.getItem("usuariosRegistrados");
  return usuarios ? JSON.parse(usuarios) : [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
}

function guardarUsuarioLogueado(usuario) {
  localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
}

// Validar email
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(email).toLowerCase());
}

// Función para registrar usuario
function registrarUsuario(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre")?.value;
  const apellidop = document.getElementById("apellidopat")?.value;
  const apellidom = document.getElementById("apellidomat")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("pw")?.value;
  const fechaNacimiento = document.getElementById("fechanacimiento")?.value;

  // Validaciones
  if (
    !nombre ||
    !apellidop ||
    !apellidom ||
    !email ||
    !password ||
    !fechaNacimiento
  ) {
    alert("Por favor, complete todos los campos");
    return;
  }

  if (!validateEmail(email)) {
    alert("Por favor, ingrese un correo válido");
    return;
  }

  // Verificar si el usuario ya existe
  const usuarios = obtenerUsuarios();
  const usuarioExiste = usuarios.find((user) => user.email === email);

  if (usuarioExiste) {
    alert("Ya existe una cuenta con este correo electrónico");
    return;
  }

  // Crear nuevo usuario
  const nuevoUsuario = {
    id: Date.now(),
    nombre: nombre,
    apellidop: apellidop,
    apellidom: apellidom,
    email: email,
    password: password,
    fechaNacimiento: fechaNacimiento,
    fechaRegistro: new Date().toISOString(),
  };

  // Guardar usuario
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  alert("Usuario registrado exitosamente");
  window.location.href = "login.html";
}

// Función para registrar con Google
function registrarConGoogle() {
  const usuarios = obtenerUsuarios();
  const usuarioGoogleExiste = usuarios.find(
    (user) => user.email === "usuario@gmail.com"
  );
  
  if (usuarioGoogleExiste) {
    alert("Ya existe una cuenta de Google registrada. Por favor, inicie sesión.");
    window.location.href = "login.html";
    return;
  }

  // Crear usuario de prueba con Google
  const usuarioGoogle = {
    id: Date.now(),
    nombre: "Usuario",
    apellidop: "Google",
    apellidom: "Test",
    email: "usuario@gmail.com",
    password: "1234",
    fechaNacimiento: "1990-01-01",
    fechaRegistro: new Date().toISOString(),
    cuentaGoogleVinculada: true,
  };

  // Guardar usuario
  usuarios.push(usuarioGoogle);
  guardarUsuarios(usuarios);

  // Iniciar sesión automáticamente
  guardarUsuarioLogueado(usuarioGoogle);

  alert("¡Registro con Google exitoso! Redirigiendo...");
  window.location.href = "index.html";
}

// Asociar eventos
document
  .getElementById("registroForm")
  ?.addEventListener("submit", registrarUsuario);
document
  .querySelector(".google-btn")
  ?.addEventListener("click", registrarConGoogle);
