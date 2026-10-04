const themeButton = document.getElementById("theme-button");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeButton.textContent = "🌙";
}

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");

  themeButton.textContent = isLight ? "🌙" : "☀️";

  localStorage.setItem("theme", isLight ? "light" : "dark");
});

(function () {
  document.querySelectorAll(".cx-carousel").forEach(function (root) {
    const track   = root.querySelector(".cx-track");
    const slides  = root.querySelectorAll(".cx-slide");
    const titleEl = root.querySelector(".cx-title");
    const textEl  = root.querySelector(".cx-text");
    const dotsEl  = root.querySelector(".cx-dots");
    const total   = slides.length;
    let index = 0;

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "cx-dot";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsEl.appendChild(dot);
    });

    function goTo(i) {
      index = (i + total) % total;
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      titleEl.textContent = slides[index].dataset.title || "";
      textEl.textContent  = slides[index].dataset.text || "";
      Array.prototype.forEach.call(dotsEl.children, function (d, n) {
        d.classList.toggle("cx-active", n === index);
      });
    }

    root.querySelector(".cx-prev").addEventListener("click", function () { goTo(index - 1); });
    root.querySelector(".cx-next").addEventListener("click", function () { goTo(index + 1); });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft")  goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });

    goTo(0);
  });
})();

(function () {
  const form = document.getElementById("contact-form");
  const overlay = document.getElementById("popup-overlay");
  if (!form || !overlay) return;

  function closePopup() { overlay.classList.remove("popup-show"); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    overlay.classList.add("popup-show");
    form.reset();
  });

  document.getElementById("popup-close").addEventListener("click", closePopup);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePopup(); 
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });
})();