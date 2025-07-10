document.addEventListener("DOMContentLoaded", function () {
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
  const btnCambiar = document.querySelector(".columna .btn-accion");
  const popupCambio = document.getElementById("popup-confirmacion");

  btnCambiar.addEventListener("click", function () {
    const inputs = document.querySelectorAll('input[type="password"]');
    const nueva = inputs[1].value;
    const confirmar = inputs[2].value;

    if (nueva && confirmar && nueva === confirmar) {
      popupCambio.style.display = "flex";
      limpiarFormularioPassword(); 
    } else {
      alert("Las contraseñas no coinciden o están vacías.");
    }
  });

  window.cerrarPopup = function () {
    popupCambio.style.display = "none";
  };

  // === ELIMINACIÓN DE CUENTA ===
  const btnEliminar = document.querySelectorAll(".btn-accion")[1];
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
  const btnVincular = document.querySelectorAll(".btn-accion")[2];
  const popupVincular = document.getElementById("popup-vincular");

  btnVincular.addEventListener("click", function () {
    popupVincular.style.display = "flex";
    limpiarFormularioPassword();
  });

  window.cerrarVinculacion = function () {
    popupVincular.style.display = "none";
  };

  // === MENÚ HAMBURGUESA ===
  const toggle = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".menu");

  toggle.addEventListener("click", function () {
    navMenu.classList.toggle("mostrar");
  });
});
