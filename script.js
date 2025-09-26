const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const entriesBox = document.getElementById('entries');

let spinning = false;
let angle = 0;
let angularVelocity = 0;
let animationFrameId;

// Hàm vẽ bánh xe với entries
function drawWheel(a = 0) {
  const entries = entriesBox.value
    .split("\n")
    .map(e => e.trim())
    .filter(e => e.length > 0);

  const n = entries.length || 1; // số ô
  const arc = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, wheel.width, wheel.height);

  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate(a);

  for (let i = 0; i < n; i++) {
    // vẽ sector
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 240, i * arc, (i + 1) * arc);
    ctx.closePath();
    ctx.fillStyle = i % 2 === 0 ? "#f8b400" : "#f85f73";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    // vẽ text
    ctx.save();
    ctx.rotate(i * arc + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px Arial";
    ctx.fillText(entries[i] || "?", 220, 10);
    ctx.restore();
  }

  ctx.restore();
}

drawWheel();

// Hàm quay bánh xe
function spinWheel() {
  if (spinning) return;
  spinning = true;

  angularVelocity = Math.random() * 0.2 + 0.35;
  let deceleration = 0.992;

  function animate() {
    angle += angularVelocity;
    angularVelocity *= deceleration;

    drawWheel(angle);

    if (angularVelocity < 0.002) {
      spinning = false;
      cancelAnimationFrame(animationFrameId);

      // Xác định kết quả
      const entries = entriesBox.value
        .split("\n")
        .map(e => e.trim())
        .filter(e => e.length > 0);
      if (entries.length > 0) {
        const arc = (2 * Math.PI) / entries.length;
        const index = Math.floor(((2 * Math.PI) - (angle % (2 * Math.PI))) / arc) % entries.length;
        showPopup(options[selected]);
      }
      return;
    }
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();
}

wheel.addEventListener('click', spinWheel);
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === "Enter") spinWheel();
});

let currentResult = null; // lưu kết quả quay

function showPopup(result) {
  currentResult = result;
  document.getElementById("popupText").textContent = "🎉 Kết quả: " + result;
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function removeResult() {
  options = options.filter(opt => opt !== currentResult);
  drawRouletteWheel();
  closePopup();
}
