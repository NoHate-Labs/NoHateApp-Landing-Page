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

const cambiarForm = document.querySelector('form[name="form-cambiar"]');
if (cambiarForm) {
  cambiarForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const nuevaPw = cambiarForm.elements["password1"].value;
    const confirmarPw = cambiarForm.elements["password2"].value;

    if (!email || !nuevaPw || !confirmarPw) {
      alert("Por favor, complete todos los campos");
      return;
    }
    if (!validateEmail(email)) {
      alert("Por favor, ingrese un correo válido");
      return;
    }
    if (nuevaPw !== confirmarPw) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find((user) => user.email === email);

    if (!usuario) {
      alert("No existe una cuenta con este correo electrónico");
      return;
    }

    usuario.password = nuevaPw;
    guardarUsuarios(usuarios);

    // Si el usuario está logueado, actualiza su contraseña en localStorage
    const usuarioLogueado = obtenerUsuarioLogueado();
    if (usuarioLogueado && usuarioLogueado.email === email) {
      usuarioLogueado.password = nuevaPw;
      guardarUsuarioLogueado(usuarioLogueado);
    }

    alert("Contraseña actualizada exitosamente");
    window.location.href = "login.html";
  });
}

//validar email
function validateEmail(femail1) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(femail1).toLowerCase());
}
