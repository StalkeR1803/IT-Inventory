const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Animate progress bars
const progressBars = document.querySelectorAll('.progress');
progressBars.forEach((bar) => {
  const value = bar.dataset.value || 0;
  const fill = document.createElement('div');
  fill.className = 'fill';
  fill.style.width = '0%';
  bar.appendChild(fill);
  requestAnimationFrame(() => {
    fill.style.width = `${value}%`;
  });
});

// Build sparklines using canvas
const sparklines = document.querySelectorAll('.sparkline');
sparklines.forEach((spark) => {
  const points = (spark.dataset.points || '')
    .split(',')
    .map((p) => Number(p.trim()))
    .filter((p) => !Number.isNaN(p));

  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = spark.clientWidth * dpr;
  canvas.height = spark.clientHeight * dpr;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  spark.appendChild(canvas);

  if (points.length < 2) return;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const width = spark.clientWidth;
  const height = spark.clientHeight;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#4f7df5';
  ctx.beginPath();

  points.forEach((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((point - min) / range) * height;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
  ctx.fillStyle = 'rgba(79, 125, 245, 0.25)';
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();
});

// animate breakdown bars
const breakdownBars = document.querySelectorAll('.breakdown-item .bar');
breakdownBars.forEach((bar) => {
  const value = bar.dataset.value || 0;
  const fill = document.createElement('div');
  fill.className = 'fill';
  fill.style.width = '0%';
  bar.appendChild(fill);
  requestAnimationFrame(() => {
    fill.style.width = `${value}%`;
  });
});
