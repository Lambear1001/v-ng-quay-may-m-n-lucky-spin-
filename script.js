const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');

function drawWheel(angle = 0) {
 function drawCurvedText(ctx, text, centerX, centerY, radius, startAngle, clockwise=true) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(startAngle);

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // Ước lượng độ rộng mỗi ký tự (có thể chỉnh lại cho đẹp hơn)
    const angle = (clockwise ? 1 : -1) * (Math.PI / 32);

    ctx.save();
    ctx.rotate(i * angle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 32px Arial";
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#888";
    ctx.shadowBlur = 4;
    ctx.fillText(char, 0, -radius);
    ctx.restore();
  }
  ctx.restore();
}

// Vẽ bánh xe và chữ cong
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

  // Vẽ chữ cong phía trên
  drawCurvedText(ctx, "Click to spin", 250, 250, 180, -Math.PI/2, true);
  // Vẽ chữ cong phía dưới
  drawCurvedText(ctx, "or press ctrl+enter", 250, 250, 180, Math.PI/2, false);
}
drawWheel();
 
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
