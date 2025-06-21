const botonHamburguesa = document.querySelector(".menu_boton");
const menu = document.querySelector(".menu_horizontal");
botonHamburguesa.addEventListener("click", () => {
  menu.classList.toggle("active");
});
