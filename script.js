const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = { x: null, y: null };
window.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

class Drop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = Math.random() * 20 + 10;
    this.speed = Math.random() * 4 + 2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    // 마우스 주변에서 튕기기
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      const angle = Math.atan2(dy, dx);
      this.x += Math.cos(angle) * 4;
      this.y += Math.sin(angle) * 4;
    } else {
      this.y += this.speed;
    }

    if (this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

const drops = [];
for (let i = 0; i < 300; i++) {
  drops.push(new Drop());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let drop of drops) {
    drop.update();
    drop.draw();
  }
  requestAnimationFrame(animate);
}

animate();
