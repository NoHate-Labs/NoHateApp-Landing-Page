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
    limpiarFormulario();
  }
});

// Cerrar popup
document.querySelector(".boton-cerrar").addEventListener("click", function () {
  popupConfirmacion.style.display = "none";
});
