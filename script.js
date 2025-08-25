document.addEventListener("DOMContentLoaded", () => {
  // Element references
  const blackout = document.getElementById("blackout");
  const lightBtn = document.getElementById("lightBtn");
  const roomReveal = document.getElementById("roomReveal");
  const roomQuote = document.getElementById("roomQuote");
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  const readBtn = document.getElementById("readBtn");
  const letterSection = document.getElementById("letterSection");
  const hideBtn = document.getElementById("hideBtn");
  const lightAgainBtn = document.getElementById("lightAgainBtn");
  const breeImage = document.getElementById("breeImage");
  const introSection = document.querySelector(".intro");

  // Final message element
  const finalMessage = document.createElement("p");
  finalMessage.className = "final-message";
  finalMessage.textContent = "Love, Mariposa";

  // Phase 1: Fade to black after poetic intro
  setTimeout(() => {
    if (introSection) {
      introSection.classList.add("fade-out");
      setTimeout(() => {
        introSection.classList.add("hidden");
        blackout.style.opacity = "1";
        blackout.style.pointerEvents = "auto";

        setTimeout(() => {
          lightBtn.classList.remove("hidden");
          lightBtn.classList.add("show");
        }, 1000);
      }, 1500);
    } else {
      // Fallback if intro is missing
      blackout.style.opacity = "1";
      blackout.style.pointerEvents = "auto";
      setTimeout(() => {
        lightBtn.classList.remove("hidden");
        lightBtn.classList.add("show");
      }, 1000);
    }
  }, 5000); // Wait for poetic intro to finish

  // Phase 2: Turn on lights
  lightBtn.addEventListener("click", () => {
    blackout.style.opacity = "0";
    blackout.style.pointerEvents = "none";
    roomReveal.classList.remove("hidden");
    lightBtn.remove();

    setTimeout(() => {
      musicBtn.classList.remove("hidden");
      musicBtn.classList.add("show");
    }, 2000);
  });

  // Phase 3: Play music
  musicBtn.addEventListener("click", () => {
    bgMusic.play();
    musicBtn.remove();

    setTimeout(() => {
      readBtn.classList.remove("hidden");
      readBtn.classList.add("show");
    }, 2000);
  });

  // Phase 4: Read the letter
  readBtn.addEventListener("click", () => {
    letterSection.classList.remove("hidden");
    roomQuote.classList.add("hidden");
    if (introSection) introSection.classList.add("hidden");
    roomReveal.classList.add("hidden");
    blackout.classList.add("hidden");
    readBtn.remove();

    setTimeout(() => {
      hideBtn.classList.remove("hidden");
      hideBtn.classList.add("show");
    }, 2000);
  });

  // Phase 5: Hide the letter
  hideBtn.addEventListener("click", () => {
    letterSection.classList.add("hidden");
    hideBtn.remove();

    blackout.classList.remove("hidden");
    blackout.style.opacity = "1";
    blackout.style.pointerEvents = "auto";

    roomReveal.classList.add("hidden");
    if (introSection) introSection.classList.add("hidden");

    setTimeout(() => {
      lightAgainBtn.classList.remove("hidden");
      lightAgainBtn.classList.add("show");
    }, 2000);
  });

  // Phase 6: Final reveal
  lightAgainBtn.addEventListener("click", () => {
    blackout.style.opacity = "0";
    blackout.style.pointerEvents = "none";

    roomReveal.classList.add("hidden");
    letterSection.classList.add("hidden");
    if (introSection) introSection.classList.add("hidden");
    lightAgainBtn.remove();

    breeImage.classList.remove("hidden");
    breeImage.appendChild(finalMessage);

    launchFireworks();
  });

  // Fireworks setup
  function launchFireworks() {
    const fireworks = document.createElement("div");
    fireworks.className = "fireworks";
    fireworks.innerHTML = `<canvas id="fireCanvas"></canvas>`;
    document.body.appendChild(fireworks);

    const canvas = document.getElementById("fireCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    let particles = [];

    function createParticle() {
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 4 + 2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1
      });
    }

    for (let i = 0; i < 100; i++) createParticle();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.01;
        ctx.fillStyle = `rgba(255, 200, 100, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
      particles = particles.filter(p => p.alpha > 0);
      if (particles.length > 0) requestAnimationFrame(animate);
    }

    animate();
  }
});
