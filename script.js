const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const spidermanBtn = document.getElementById('spiderman');
const ironmanBtn = document.getElementById('ironman');
const clearBtn = document.getElementById('clear');
const colorPicker = document.getElementById('colorPicker');
const sizePicker = document.getElementById('sizePicker');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.75;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let drawing = false;

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;
    
    ctx.lineWidth = sizePicker.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Mouse Events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch Events
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
}, { passive: false });
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
}, { passive: false });
canvas.addEventListener('touchend', stopDrawing);

// Character Backgrounds
spidermanBtn.onclick = () => {
    canvas.style.backgroundImage = "url('https://i.imgur.com/8K5bC4Y.png')";
};

ironmanBtn.onclick = () => {
    canvas.style.backgroundImage = "url('https://i.imgur.com/M6LgA4f.png')";
};

// Clear Canvas
clearBtn.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};