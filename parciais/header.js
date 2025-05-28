document.addEventListener("DOMContentLoaded", function () {
  fetch("/parciais/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch((err) => {
      console.error("Erro ao carregar o header:", err);
    });
});
