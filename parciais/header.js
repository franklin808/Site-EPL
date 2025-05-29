document.addEventListener("DOMContentLoaded", function () {
  fetch("/parciais/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Adiciona o event listener após o HTML ter sido carregado
      const menuButton = document.getElementById("mobile-menu-button");
      const mobileMenu = document.getElementById("mobile-menu");

      if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
          mobileMenu.classList.toggle("hidden");
        });
      }
    })
    .catch((err) => {
      console.error("Erro ao carregar o header:", err);
    });
});
