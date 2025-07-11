//validar formulario recuperar contraseña
const form = document.querySelector('form[name="form-recuperar"]');
if (form) {
  form.addEventListener("submit", (event) => {
    const femail1 = form.elements["email"].value;
    if (!femail1) {
      event.preventDefault();
      alert("Por favor, ingrese su correo");
    } else if (!validateEmail(femail1)) {
      event.preventDefault();
      alert("Por favor, ingrese un correo válido");
    } else {
      event.preventDefault();
      alert("Correo enviado exitosamente");
      window.location.href =
        "CambiarContraseña.html?email=" + encodeURIComponent(femail1);
    }
  });
}

// Validar email
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(email).toLowerCase());
}