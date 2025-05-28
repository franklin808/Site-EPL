fetch("/parciais/footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;

    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  })
  .catch((err) => {
    console.error("Erro ao carregar o footer:", err);
  });
