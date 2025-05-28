document.addEventListener("DOMContentLoaded", function () {
  fetch("/parciais/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((err) => {
      console.error("Erro ao carregar o footer:", err);
    });
});
