let currentStep = 1;
let totalStudents = 0;

function nextStep(step) {
  document.getElementById(`step${currentStep}`).classList.remove("active");
  currentStep = step;
  document.getElementById(`step${currentStep}`).classList.add("active");

  if (step === 2 && !document.getElementById("classSelect").value) {
    alert("Hãy chọn lớp trước!");
    currentStep = 1;
    document.getElementById("step1").classList.add("active");
  }
}

function showPanel(panel) {
  document.getElementById("studentPanel").classList.remove("active");
  document.getElementById("wheelPanel").classList.remove("active");

  if (panel === "student") {
    document.getElementById("studentPanel").classList.add("active");
  } else {
    document.getElementById("wheelPanel").classList.add("active");
  }
}

function pickStudent() {
  totalStudents = parseInt(document.getElementById("studentCount").value);
  if (!totalStudents || totalStudents <= 0) {
    alert("Hãy nhập số học sinh hợp lệ!");
    return;
  }
  let student = Math.floor(Math.random() * totalStudents) + 1;
  document.getElementById("studentResult").innerText = `Học sinh số: ${student}`;
}

// ================== VÒNG QUAY ==================
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const segments = ["Toán", "Văn", "Anh", "Khoa học", "Sử", "Địa"];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6", "#1ABC9C"];
let startAngle = 0;
let spinning = false;
let spinTimeout = null;

function drawWheel() {
  const arc = Math.PI * 2 / segments.length;
  for (let i = 0; i < segments.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + arc);
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(200 + Math.cos(angle + arc / 2) * 120, 200 + Math.sin(angle + arc / 2) * 120);
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    ctx.fillText(segments[i], -ctx.measureText(segments[i]).width / 2, 0);
    ctx.restore();
  }
}
drawWheel();

function spinWheel() {
  if (spinning) return;
  spinning = true;
  let spinAngle = Math.random() * 10 + 10;
  let spinTime = 0;
  let spinTimeTotal = 3000;

  function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel(spinAngle);
      return;
    }
    startAngle += spinAngle * Math.PI / 180;
    drawWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
  }
  rotateWheel();
}

function stopRotateWheel(spinAngle) {
  clearTimeout(spinTimeout);
  const arc = Math.PI * 2 / segments.length;
  const degrees = startAngle * 180 / Math.PI + 90;
  const index = Math.floor((segments.length - (degrees % 360) / (360 / segments.length)) % segments.length);
  document.getElementById("wheelResult").innerText = `Chủ đề: ${segments[index]}`;
  spinning = false;
}
