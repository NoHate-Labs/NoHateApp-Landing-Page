function guardarUsuarios(usuarios) {
  localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
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

document
  .getElementById("registroForm")
  ?.addEventListener("submit", registrarUsuario);
