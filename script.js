cconst wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');

let angle = 0;
let spinning = false;
let animationFrameId;
let options = [];
let currentWinner = null;

function drawWheel(rotation = 0) {
  ctx.clearRect(0,0,500,500);
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate(rotation);

  // Nếu có entries thì chia bánh xe
  if (options.length > 0) {
    let arc = 2 * Math.PI / options.length;
    for (let i = 0; i < options.length; i++) {
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.fillStyle = i % 2 === 0 ? "#f4b400" : "#4285f4";
      ctx.arc(0, 0, 240, i * arc, (i+1) * arc);
      ctx.fill();
      
      // text
      ctx.save();
      ctx.rotate(i * arc + arc/2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.fillText(options[i], 220, 10);
      ctx.restore();
    }
  } else {
    // mặc định nền xám
    ctx.beginPath();
    ctx.arc(0,0,240,0,2*Math.PI);
    ctx.fillStyle = "#bbb";
    ctx.fill();
  }

  ctx.restore();
}

drawWheel();

// Quay bánh xe
function spinWheel() {
  if (spinning || options.length === 0) return;
  spinning = true;
  let angularVelocity = Math.random() * 0.2 + 0.35;
  let deceleration = 0.995;

  function animate() {
    angle += angularVelocity;
    angularVelocity *= deceleration;

    drawWheel(angle);

    if (angularVelocity < 0.002) {
      spinning = false;
      cancelAnimationFrame(animationFrameId);

      // Tính kết quả
      let arc = 2 * Math.PI / options.length;
      let selected = Math.floor(((2 * Math.PI - (angle % (2 * Math.PI))) % (2 * Math.PI)) / arc);
      currentWinner = options[selected];
      showWinner(currentWinner);
      return;
    }
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();
}

wheel.addEventListener('click', spinWheel);

// --- Modal xử lý ---
function showWinner(winner) {
  document.getElementById("winnerText").textContent = winner;
  document.getElementById("winnerModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("winnerModal").style.display = "none";
}

function removeWinner() {
  options = options.filter(opt => opt !== currentWinner);
  drawWheel();
  closeModal();
}

// --- Nhập entries ---
document.getElementById("entries").addEventListener("input", e => {
  options = e.target.value.split("\n").filter(x => x.trim() !== "");
  drawWheel();
});
