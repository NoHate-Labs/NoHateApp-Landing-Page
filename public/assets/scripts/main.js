document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu-horizontal");

  toggleButton.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
});
