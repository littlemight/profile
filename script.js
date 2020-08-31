document.getElementById("home-button").onclick = () => {
  window.scrollTo(0, 0);
};

// Theme toggler Start
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
toggleButton.onclick = () => {
  console.log(body.classList);
  body.classList.toggle("dark");
  body.classList.toggle("light");
};
// Theme toggler End

// Typewriter start
class TypeWriter {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const curIdx = this.wordIndex;
    const word = this.words[curIdx];

    if (this.isDeleting) {
      this.txt = word.substring(0, this.txt.length - 1);
    } else {
      this.txt = word.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;
    // type speed
    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 4;
    }

    if (!this.isDeleting && this.txt === word) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      typeSpeed = 250;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init when DOM load
document.addEventListener("DOMContentLoaded", () => {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
});
// Typewriter end

// Particles start
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.color = color;
  }

  // draw each particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // update particle position
  update() {
    if (this.x > canvas.width || this.x < 0) this.dirX *= -1;
    if (this.y > canvas.height || this.y < 0) this.dirY *= -1;

    this.x += this.dirX;
    this.y += this.dirY;
    this.draw();
  }
}

const init = () => {
  particlesArray = [];
  const nParticles = (canvas.height * canvas.width) / 9000;
  for (var i = 0; i < nParticles; i++) {
    const size = Math.random() * 5;
    const x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    const y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    const speed = 0.8;
    const dirX = Math.random() * speed - speed / 2;
    const dirY = Math.random() * speed - speed / 2;
    const color = "#e6b450";
    particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
};

const connect = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = 0; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const dist = dx * dx + dy * dy;
      if (dist < (canvas.width / 7) * (canvas.height / 7)) {
        let opacity = 1 - dist / 10000;
        ctx.strokeStyle = `rgba(255, 204, 102, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
};

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 150) * (canvas.width / 150);
  init();
});

init();
animate();
// Particles end
