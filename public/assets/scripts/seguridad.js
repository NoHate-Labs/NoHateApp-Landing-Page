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
    const actual = formCambio.querySelector('input[name="pw-actual"]').value;
    const nueva = formCambio.querySelector('input[name="pw-nuevo"]').value;
    const confirmar = formCambio.querySelector('input[name="pw-confirmar"]').value;

    if (!actual || !nueva || !confirmar) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (nueva && confirmar && nueva === confirmar) {
      popupCambio.style.display = "flex";
      limpiarFormularioPassword();
    } else {
      alert("Las contraseñas no coinciden o están vacías.");
    }
  });
}

// === ELIMINACIÓN DE CUENTA ===
const btnEliminar = document.getElementById("btn-eliminar");
const popupEliminar = document.getElementById("popup-eliminar");
const btnConfirmarEliminar = document.getElementById("confirmarEliminar");
const btnCancelarEliminar = document.getElementById("cancelarEliminar");

btnEliminar.addEventListener("click", function () {
  popupEliminar.style.display = "flex";
  limpiarFormularioPassword();
});

btnConfirmarEliminar.addEventListener("click", function () {
  const texto = document.getElementById("confirmarTexto").value.trim();
  if (texto === "CONFIRMAR") {
    alert("Cuenta eliminada permanentemente.");
    popupEliminar.style.display = "none";
    limpiarConfirmarTexto();
  } else {
    alert('Debes escribir la palabra "CONFIRMAR" exactamente.');
  }
});

btnCancelarEliminar.addEventListener("click", function () {
  popupEliminar.style.display = "none";
  limpiarConfirmarTexto();
});

// === VINCULAR CUENTA GOOGLE ===
const btnVincular = document.getElementById("btn-vincular");
const popupVincular = document.getElementById("popup-vincular");

btnVincular.addEventListener("click", function () {
  popupVincular.style.display = "flex";
  limpiarFormularioPassword();
});

document.querySelectorAll(".boton-cerrar").forEach((btn) => {
  btn.addEventListener("click", function () {
    const popupCambio = document.getElementById("popup-confirmacion");
    const popupVincular = document.getElementById("popup-vincular");
    popupCambio.style.display = "none";
    popupVincular.style.display = "none";
  });
});
