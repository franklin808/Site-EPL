document.addEventListener("DOMContentLoaded", () => {
  const sr = ScrollReveal({ reset: false });

  sr.reveal(".reveal-top", {
    origin: "top",
    distance: "40px",
    duration: 800,
    delay: 100,
    easing: "ease-in-out",
  });

  sr.reveal(".reveal-bottom", {
    origin: "bottom",
    distance: "40px",
    duration: 800,
    delay: 100,
    easing: "ease-in-out",
  });

  sr.reveal(".reveal-left", {
    origin: "left",
    distance: "40px",
    duration: 800,
    delay: 100,
    easing: "ease-in-out",
  });

  sr.reveal(".reveal-right", {
    origin: "right",
    distance: "40px",
    duration: 800,
    delay: 100,
    easing: "ease-in-out",
  });

  sr.reveal(".scale-up", {
    scale: 0.9,
    duration: 800,
    delay: 100,
    easing: "ease-in-out",
  });
});

console.log("ScrollReveal está pronto:", typeof ScrollReveal);
