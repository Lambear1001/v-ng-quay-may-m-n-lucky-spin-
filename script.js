const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
let entries = ["A", "B", "C", "D"]; // mặc định
let currentRotation = 0;

// textarea auto update
const textarea = document.getElementById("entries");
textarea.value = entries.join("\n");
textarea.addEventListener("input", () => {
  entries = textarea.value.split("\n").filter(e => e.trim() !== "");
  drawWheel();
});

// modal elements
const modal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const keepBtn = document.getElementById("keepBtn");
const removeBtn = document.getElementById("removeBtn");
let selectedEntry = null;

function drawWheel() {
  ctx.clearRect(0,0,500,500);
  const angle = (2 * Math.PI) / entries.length;
  entries.forEach((entry, i) => {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, i*angle, (i+1)*angle);
    ctx.fillStyle = i % 2 === 0 ? "#f39c12" : "#3498db";
    ctx.fill();
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(i*angle + angle/2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(entry, 220, 10);
    ctx.restore();
  });
}
drawWheel();

// spin logic
wheel.addEventListener("click", spin);
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "Enter") spin();
});

function spin() {
  if (entries.length === 0) return;
  const spins = 5 + Math.random() * 3;
  const angle = (2 * Math.PI) / entries.length;
  const randomIndex = Math.floor(Math.random() * entries.length);
  const targetRotation = (2 * Math.PI * spins) - (randomIndex * angle + angle/2);

  let start = null;
  function animate(time) {
    if (!start) start = time;
    const progress = (time - start) / 4000;
    if (progress < 1) {
      currentRotation = targetRotation * easeOut(progress);
      ctx.setTransform(1,0,0,1,0,0);
      ctx.translate(250,250);
      ctx.rotate(currentRotation);
      ctx.translate(-250,-250);
      drawWheel();
      requestAnimationFrame(animate);
    } else {
      ctx.setTransform(1,0,0,1,0,0);
      ctx.translate(250,250);
      ctx.rotate(targetRotation);
      ctx.translate(-250,-250);
      drawWheel();

      // kết quả
      selectedEntry = entries[randomIndex];
      resultText.textContent = `Result: ${selectedEntry}`;
      modal.style.display = "flex";
    }
  }
  requestAnimationFrame(animate);
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

// modal buttons
keepBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
removeBtn.addEventListener("click", () => {
  entries = entries.filter(e => e !== selectedEntry);
  textarea.value = entries.join("\n");
  drawWheel();
  modal.style.display = "none";
});
