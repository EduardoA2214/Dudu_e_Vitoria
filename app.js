// Carrossel
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const items = Array.from(document.querySelectorAll(".carousel-item"));
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsContainer = document.querySelector(".dots");

  if (!track || items.length === 0) {
    console.error("Carrossel não encontrado.");
    return;
  }

  let index = 0;
  let autoplay;

  // Criar bolinhas
  items.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.toggle("active", i === 0);
    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  // Atualiza posição do carrossel
  function updateCarousel() {
    const width = document.querySelector(".carousel-viewport").offsetWidth;
    track.style.transform = `translateX(${-index * width}px)`;

    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    items.forEach((item, i) => item.classList.toggle("active", i === index));
  }

  // Botões de navegação
  prevBtn.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
    resetAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % items.length;
    updateCarousel();
    resetAutoplay();
  });

  // Toque (swipe)
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      index = (index + 1) % items.length;
    } else if (endX - startX > 50) {
      index = (index - 1 + items.length) % items.length;
    }
    updateCarousel();
    resetAutoplay();
  });

  // Auto-play
  function startAutoplay() {
    autoplay = setInterval(() => {
      index = (index + 1) % items.length;
      updateCarousel();
    }, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }

  // Parar autoplay ao interagir
  [prevBtn, nextBtn, track].forEach((el) =>
    el.addEventListener("mouseenter", () => clearInterval(autoplay))
  );
  [prevBtn, nextBtn, track].forEach((el) =>
    el.addEventListener("mouseleave", startAutoplay)
  );

  // Redimensionamento
  window.addEventListener("resize", updateCarousel);

  // Botão surpresa ❤️
  const surpriseBtn = document.getElementById("surpriseBtn");
  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {
      const rand = Math.floor(Math.random() * items.length);
      index = rand;
      updateCarousel();

      // Animação no coração
      const heart = document.querySelector(".sparkle");
      if (heart) {
        heart.animate(
          [
            { transform: "scale(0.9) translateY(6px) rotate(-10deg)", opacity: 0.9 },
            { transform: "scale(1.25) translateY(-2px) rotate(-5deg)", opacity: 1 },
            { transform: "scale(1) translateY(6px) rotate(-10deg)", opacity: 1 },
          ],
          { duration: 700, easing: "ease-out" }
        );
      }
    });
  }

  // Inicializar
  updateCarousel();
  startAutoplay();
});
s