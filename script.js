const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("resultText");

const segments = ["tam giác cân","tam giác đều","advv","sgs","fsvs","édf"];
const colors = ["#FF6B6B","#FFD93D","#6BCB77","#4D96FF","#9B5DE5","#F15BB5","#00BBF9","#FEE440"];

let startAngle = 0;
let arc = Math.PI * 2 / segments.length;
let spinAngle = 0;
let spinTime = 0;
let spinTimeTotal = 0;
let spinning = false;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < segments.length; i++) {
    let angle = startAngle + i * arc;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, angle, angle + arc);
    ctx.closePath();
    ctx.fill();

    // Viền
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px Segoe UI";
    ctx.translate(
      250 + Math.cos(angle + arc / 2) * 160,
      250 + Math.sin(angle + arc / 2) * 160
    );
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    ctx.fillText(segments[i], -ctx.measureText(segments[i]).width / 2, 0);
    ctx.restore();
  }
}

function rotateWheel() {
  spinTime += 20;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  let spinAngleChange = easeOut(spinTime, 0, spinAngle, spinTimeTotal);
  startAngle += (spinAngleChange * Math.PI / 180);
  drawWheel();
  requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
  let degrees = startAngle * 180 / Math.PI + 90;
  let arcd = 360 / segments.length;
  let index = Math.floor((360 - (degrees % 360)) / arcd) % segments.length;

  resultText.textContent = `🎉 Chủ đề: ${segments[index]} 🎉`;
  spinning = false;
}

function easeOut(t, b, c, d) {
  let ts = (t/=d)*t;
  let tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  resultText.textContent = "";

  spinAngle = Math.random() * 10 + 10; // góc quay
  spinTime = 0;
  spinTimeTotal = 3000 + Math.random() * 2000;

  rotateWheel();
}

spinBtn.addEventListener("click", spinWheel);

drawWheel();
