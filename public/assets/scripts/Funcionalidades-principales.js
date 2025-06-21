const botonHamburguesa = document.querySelector(".MenuBoton");
const menu = document.querySelector(".MenuHorizontal");
botonHamburguesa.addEventListener("click", () => {
  menu.classList.toggle("active");
});