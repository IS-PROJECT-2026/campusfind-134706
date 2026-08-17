const CampusFindUtils = (() => {
  function formatDate(dateStr) {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function formatDateTime(isoStr) {
    if (!isoStr) return 'Unknown';
    return new Date(isoStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function showToast(message, duration = 3000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), duration);
  }

  function getStatusBadge(status) {
    const labels = {
      active: 'Active',
      possible_match: 'Possible Match',
      recovered: 'Recovered',
      closed: 'Closed',
    };
    const classes = {
      active: 'badge-active',
      possible_match: 'badge-match',
      recovered: 'badge-recovered',
      closed: 'badge-closed',
    };
    return `<span class="badge ${classes[status] || 'badge-active'}">${labels[status] || status}</span>`;
  }

  function getTypeBadge(type) {
    return type === 'lost'
      ? '<span class="badge badge-lost">Lost</span>'
      : '<span class="badge badge-found">Found</span>';
  }

  function getCategoryIcon(category) {
    const icons = {
      Electronics: '💻',
      Clothing: '👕',
      Documents: '📄',
      Keys: '🔑',
      Bags: '🎒',
      Other: '📦',
    };
    return icons[category] || '📦';
  }

  function validateRequired(fields) {
    const errors = {};
    Object.entries(fields).forEach(([key, value]) => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        errors[key] = 'This field is required';
      }
    });
    return errors;
  }

  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    menu.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  function readImageFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function renderItemCard(item) {
    const imageHtml = item.image
      ? `<img class="card-image" src="${item.image}" alt="${item.name}">`
      : `<div class="card-image-placeholder">${getCategoryIcon(item.category)}</div>`;

    return `
      <article class="card">
        ${imageHtml}
        <div class="card-body">
          <div class="card-meta">
            ${getTypeBadge(item.type)}
            ${getStatusBadge(item.status)}
          </div>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-description">${item.description}</p>
          <div class="card-meta">
            <span>📍 ${item.location}</span>
            <span>📅 ${formatDate(item.date)}</span>
          </div>
          <a href="item.html?id=${item.id}" class="btn btn-outline btn-sm">View Details</a>
        </div>
      </article>
    `;
  }

  return {
    formatDate,
    formatDateTime,
    getQueryParam,
    showToast,
    getStatusBadge,
    getTypeBadge,
    getCategoryIcon,
    validateRequired,
    initNav,
    readImageFile,
    renderItemCard,
  };
})();

if (typeof module !== 'undefined') module.exports = CampusFindUtils;
