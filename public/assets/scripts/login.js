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
document.getElementById("loginForm").addEventListener("submit", iniciarSesion);
