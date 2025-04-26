const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Load Images
const mario = new Image();
mario.src = "assets/mario.png";

const bg = new Image();
bg.src = "assets/background.png";

const groundHeight = 50;

let x = 50, y = canvas.height - groundHeight - 64;
let vx = 0, vy = 0;
let gravity = 1.5;
let onGround = false;
let keys = {};

window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

function gameLoop() {
  // Physics
  if (keys["ArrowRight"]) vx = 5;
  else if (keys["ArrowLeft"]) vx = -5;
  else vx = 0;

  if (keys[" "] && onGround) {
    vy = -18;
    onGround = false;
  }

  vy += gravity;
  x += vx;
  y += vy;

  // Ground Collision
  if (y + 64 >= canvas.height - groundHeight) {
    y = canvas.height - groundHeight - 64;
    vy = 0;
    onGround = true;
  }

  // Render
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#654321";
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

  // Draw Mario
  ctx.drawImage(mario, x, y, 64, 64);

  requestAnimationFrame(gameLoop);
}

gameLoop();
