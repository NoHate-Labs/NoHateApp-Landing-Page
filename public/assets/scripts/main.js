// Función para mostrar el modal
const botonHamburguesa = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu-horizontal");
botonHamburguesa.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Validación de inicio de sesión
const testUser = {
  email: "usuario@gmail.com",
  password: "1234"
};

// Función para validar el inicio de sesión
function iniciarSesion(event) {
  event.preventDefault(); // Evita el envío del formulario

  // Obtén los valores del formulario
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validación simple
  if (email === testUser.email && password === testUser.password) {
      alert("¡Inicio de sesión exitoso!");
      // Redirigir o realizar otra acción aquí
  } else {
      alert("Usuario o contraseña incorrectos.");
  }
}

// Asocia la función al botón del formulario
document.getElementById("loginForm")?.addEventListener("submit", iniciarSesion);


//funcion para mostrar el año actual en el footer
function mostrarAnioActual() {
  const fecha = new Date();
  const anioActual = fecha.getFullYear();
  document.getElementById("anio").textContent = anioActual;
}

mostrarAnioActual();

//validar formulario recuperar contraseña
const form = document.querySelector('form[name="form-recuperar"]');
form.addEventListener("submit", (event) => {
  const femail1 = form.elements["email-recuperar"].value;
  if (!femail1) {
    event.preventDefault();
    alert("Por favor, ingrese su correo");
  } else if (!validateEmail(femail1)) {
    event.preventDefault();
    alert("Por favor, ingrese un correo válido");
  }
});
//validar email
function validateEmail(femail1) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(femail1).toLowerCase());
}
