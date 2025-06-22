const botonHamburguesa = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu-horizontal");
botonHamburguesa.addEventListener("click", () => {
  menu.classList.toggle("active");
});