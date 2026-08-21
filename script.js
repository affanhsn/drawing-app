const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const colorPicker = document.getElementById('colorPicker');
const sizePicker = document.getElementById('sizePicker');
const swatches = document.querySelectorAll('.color-swatch');

// Marvel Outlines
const outlines = {
    spiderman: 'https://i.imgur.com/8K5bC4Y.png',
    ironman: 'https://i.imgur.com/M6LgA4f.png'
};

let drawing = false;
let isEraser = false;

function init() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 500;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

window.addEventListener('resize', init);
init();

function startPosition(e) {
    drawing = true;
    draw(e);
}

function finishedPosition() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineWidth = sizePicker.value;
    
    if (isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
    } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = colorPicker.value;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); });
canvas.addEventListener('touchend', finishedPosition);
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });

eraserBtn.onclick = () => {
    isEraser = !isEraser;
    eraserBtn.classList.toggle('active');
};

clearBtn.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

swatches.forEach(swatch => {
    swatch.onclick = () => {
        isEraser = false;
        eraserBtn.classList.remove('active');
        colorPicker.value = swatch.dataset.color;
    };
});

document.getElementById('spiderman').onclick = () => setBackground('spiderman');
document.getElementById('ironman').onclick = () => setBackground('ironman');

function setBackground(char) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundImage = `url('${outlines[char]}')`;
}
