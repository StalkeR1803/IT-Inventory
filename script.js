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

// Inventory table data
const inventoryTableBody = document.getElementById('inventory-table-body');
if (inventoryTableBody) {
  const inventoryRows = [
    { category: 'Laptops', total: 428, inUse: 390, available: 38, lifecycle: 'Refresh FY25' },
    { category: 'Network', total: 92, inUse: 84, available: 8, lifecycle: 'Stable' },
    { category: 'Software', total: 1502, inUse: 1410, available: 92, lifecycle: 'Renewals Q3' },
    { category: 'Accessories', total: 764, inUse: 622, available: 142, lifecycle: 'Reorder' },
    { category: 'Data Center', total: 61, inUse: 58, available: 3, lifecycle: 'Capacity review' },
  ];

  inventoryRows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.category}</td>
      <td>${row.total.toLocaleString()}</td>
      <td>${row.inUse.toLocaleString()}</td>
      <td>${row.available.toLocaleString()}</td>
      <td><span class="badge">${row.lifecycle}</span></td>
    `;
    inventoryTableBody.appendChild(tr);
  });
}

// Renewal timeline data
const renewalList = document.getElementById('renewal-list');
if (renewalList) {
  const renewalItems = [
    { title: 'Endpoint protection (1,200 seats)', date: 'May 12', owner: 'Security', impact: 'Auto-renew - review pricing' },
    { title: 'Laptop lease batch #22', date: 'June 03', owner: 'Procurement', impact: 'Schedule staggered refresh' },
    { title: 'Core switch support', date: 'July 18', owner: 'Network', impact: 'Confirm redundancy test complete' },
    { title: 'SaaS analytics suite', date: 'August 01', owner: 'Applications', impact: 'Usage trending +18% QoQ' },
  ];

  renewalItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'timeline-card';
    card.innerHTML = `
      <div class="timeline-date">${item.date}</div>
      <h3>${item.title}</h3>
      <p class="caption">Owner: ${item.owner}</p>
      <p>${item.impact}</p>
    `;
    renewalList.appendChild(card);
  });
}
