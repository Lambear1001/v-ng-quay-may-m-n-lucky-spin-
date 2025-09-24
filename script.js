let prizes = ["Thưởng 1", "Thưởng 2", "Thưởng 3", "Thưởng 4", "Thưởng 5", "Thưởng 6"];
const colors = ["#fbc531","#e84118","#00a8ff","#9c88ff","#4cd137","#8c7ae6"];
const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");
const prizeInput = document.getElementById("prizeInput");
const updateBtn = document.getElementById("updateBtn");

let startAngle = 0;
let arc = Math.PI * 2 / prizes.length;
let spinAngle = 0;
let spinning = false;

function drawWheel() {
    arc = Math.PI * 2 / prizes.length;
    ctx.clearRect(0, 0, 500, 500);
    for(let i = 0; i < prizes.length; i++) {
        let angle = startAngle + i * arc;
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, angle, angle + arc, false);
        ctx.lineTo(250,250);
        ctx.fill();
        ctx.save();

        ctx.translate(250,250);
        ctx.rotate(angle + arc/2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 22px Arial";
        ctx.fillText(prizes[i], 200, 10);
        ctx.restore();
    }
}

drawWheel();

function spinWheel() {
    if (spinning) return;
    spinning = true;
    result.textContent = "";
    let spinTime = 0;
    let spinTimeTotal = Math.random() * 2000 + 3000; // 3-5s

    function rotateWheel() {
        spinTime += 30;
        spinAngle += Math.random() * 20 + 10;
        startAngle += (spinAngle * Math.PI / 180);
        drawWheel();

        if (spinTime < spinTimeTotal) {
            requestAnimationFrame(rotateWheel);
        } else {
            spinning = false;
            let degrees = startAngle * 180 / Math.PI % 360;
            let index = Math.floor(((360 - degrees) % 360) / (360 / prizes.length));
            result.textContent = "Bạn nhận được: " + prizes[index];
        }
    }
    rotateWheel();
}

spinBtn.addEventListener("click", spinWheel);

updateBtn.addEventListener("click", () => {
    let input = prizeInput.value;
    // Tách phần thưởng bằng dấu phẩy hoặc xuống dòng, loại bỏ phần trống đầu/cuối
    prizes = input.split(/,|\n/).map(s => s.trim()).filter(s => s);
    if (prizes.length < 2) {
        prizes = ["Thưởng 1", "Thưởng 2"];
    }
    startAngle = 0;
    drawWheel();
});
