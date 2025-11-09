// Add .fonts-loaded once fonts are ready
if (document.fonts) {
    document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
        updateProgressBar();
    });
} else {
    window.addEventListener('load', () => {
        document.body.classList.add('fonts-loaded');
        updateProgressBar();
    });
}

const currentNumEl = document.getElementById('current-num');

/**
 * Calculate dynamic color between deep red and green
 */
function getPercentageColor(percentage) {
    const start = { r: 153, g: 0, b: 0 };
    const end = { r: 74, g: 222, b: 128 };
    const p = Math.max(0, Math.min(100, percentage)) / 100;
    const r = Math.round(start.r + p * (end.r - start.r));
    const g = Math.round(start.g + p * (end.g - start.g));
    const b = Math.round(start.b + p * (end.b - start.b));
    const toHex = c => ('0' + c.toString(16)).slice(-2);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function updateProgressBar() {
    const targetNumEl = document.getElementById('target-num');
    const progressFillEl = document.getElementById('progress-fill');
    const currentBoxEl = document.getElementById('current');

    const currentVal = parseFloat(currentNumEl.textContent.replace(/,/g,'')) || 0;
    const targetVal = parseFloat(targetNumEl.textContent.replace(/,/g,'')) || 0;
    let percentage = targetVal > 0 ? Math.min(100, (currentVal / targetVal) * 100) : 0;

    progressFillEl.style.width = percentage + '%';
    progressFillEl.textContent = `${percentage.toFixed(1)}%`;

    const newColor = getPercentageColor(percentage);
    currentNumEl.style.color = newColor;
    currentBoxEl.style.borderColor = newColor;
    currentBoxEl.style.setProperty('--glow-color', newColor);
}

const ulEl = document.getElementById("list");
const items = ulEl.getElementsByTagName("li");
let sum = 0;
for (let i = 0; i < items.length; i++) {
    sum += parseInt(items[i].textContent)
}
currentNumEl.textContent = sum;