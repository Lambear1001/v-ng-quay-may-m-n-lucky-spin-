const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');

// Draw base wheel (simple grey disc)
function drawWheel(angle = 0) {
  ctx.clearRect(0,0,500,500);
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.arc(0, 0, 240, 0, 2 * Math.PI);
  ctx.fillStyle = '#bbb';
  ctx.shadowColor = "#888";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
  ctx.shadowBlur = 0;
}
drawWheel();

let spinning = false;
let angle = 0;
let angularVelocity = 0;
let animationFrameId = null;

// Hàm quay bánh xe với easing
function spinWheel() {
  if (spinning) return; // Đang quay thì không làm gì
  spinning = true;
  angle = 0;
  // Tốc độ ban đầu (radian mỗi frame)
  angularVelocity = Math.random() * 0.2 + 0.35; // random tốc độ ban đầu
  let deceleration = 0.995; // hệ số giảm tốc (0.99-0.995 sẽ chậm lại dần)

  function animate() {
    angle += angularVelocity;
    angularVelocity *= deceleration; // giảm tốc dần

    drawWheel(angle);

    // Khi tốc độ nhỏ hơn ngưỡng, thì dừng lại
    if (angularVelocity < 0.002) {
      spinning = false;
      cancelAnimationFrame(animationFrameId);
      // Bạn có thể xử lý kết quả tại đây!
      return;
    }
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();
}

document.getElementById('wheel').addEventListener('click', spinWheel);
