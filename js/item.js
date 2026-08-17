document.addEventListener('DOMContentLoaded', () => {
  CampusFindStorage.seedDemoData();
  CampusFindUtils.initNav();

  const itemId = CampusFindUtils.getQueryParam('id');
  if (!itemId) {
    window.location.href = 'browse.html';
    return;
  }

  const item = CampusFindStorage.getItemById(itemId);
  if (!item) {
    document.getElementById('item-detail').innerHTML = `
      <div class="empty-state">
        <h3>Item not found</h3>
        <p>The item you are looking for does not exist or has been removed.</p>
        <a href="browse.html" class="btn btn-primary">Browse Items</a>
      </div>
    `;
    return;
  }

  renderItemDetail(item);
});

function renderItemDetail(item) {
  const container = document.getElementById('item-detail');
  const sessionId = CampusFindStorage.getSessionId();
  const isOwner = item.reporterId === sessionId;
  const matches = CampusFindMatching.getMatchedItems(item);

  const imageHtml = item.image
    ? `<img src="${item.image}" alt="${item.name}">`
    : `<span style="font-size: 5rem;">${CampusFindUtils.getCategoryIcon(item.category)}</span>`;

  let matchHtml = '';
  if (matches.length > 0) {
    matchHtml = `
      <div class="match-banner">
        <h3>🔎 Possible Match Found</h3>
        <p>This item may match ${matches.length} other report(s). Review the matches below.</p>
        <div class="match-list">
          ${matches
            .map(
              (m) => `
            <div class="match-item">
              <div>
                <strong>${m.name}</strong>
                <div class="card-meta">
                  ${CampusFindUtils.getTypeBadge(m.type)}
                  <span>📍 ${m.location}</span>
                  <span>📅 ${CampusFindUtils.formatDate(m.date)}</span>
                </div>
              </div>
              <a href="item.html?id=${m.id}" class="btn btn-outline btn-sm">View Match</a>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  let actionsHtml = '';
  if (isOwner) {
    actionsHtml = `
      <div class="btn-group" style="margin-top: var(--spacing-lg);">
        ${
          item.status !== 'recovered'
            ? `<button id="btn-recovered" class="btn btn-secondary">Mark as Recovered</button>`
            : ''
        }
        ${
          item.status !== 'closed'
            ? `<button id="btn-close" class="btn btn-outline">Close Report</button>`
            : ''
        }
        <button id="btn-delete" class="btn btn-danger">Delete Report</button>
      </div>
    `;
  }

  container.innerHTML = `
    ${matchHtml}
    <div class="item-detail">
      <div class="item-detail-image">${imageHtml}</div>
      <div class="item-detail-info">
        <div class="card-meta" style="margin-bottom: var(--spacing-md);">
          ${CampusFindUtils.getTypeBadge(item.type)}
          ${CampusFindUtils.getStatusBadge(item.status)}
          <span class="badge badge-active">${item.category}</span>
        </div>
        <h1>${item.name}</h1>
        <div class="detail-row">
          <span class="detail-label">Description</span>
          <span class="detail-value">${item.description}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Location</span>
          <span class="detail-value">${item.location}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">${CampusFindUtils.formatDate(item.date)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Reported</span>
          <span class="detail-value">${CampusFindUtils.formatDateTime(item.createdAt)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Contact</span>
          <span class="detail-value">
            <a href="mailto:${item.contact}" class="btn btn-primary btn-sm">Contact Reporter</a>
          </span>
        </div>
        ${actionsHtml}
      </div>
    </div>
  `;

  if (isOwner) {
    document.getElementById('btn-recovered')?.addEventListener('click', () => {
      CampusFindStorage.updateStatus(item.id, 'recovered');
      CampusFindUtils.showToast('Item marked as recovered!');
      setTimeout(() => location.reload(), 1000);
    });

    document.getElementById('btn-close')?.addEventListener('click', () => {
      CampusFindStorage.updateStatus(item.id, 'closed');
      CampusFindUtils.showToast('Report closed.');
      setTimeout(() => location.reload(), 1000);
    });

    document.getElementById('btn-delete')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this report?')) {
        CampusFindStorage.deleteItem(item.id);
        CampusFindUtils.showToast('Report deleted.');
        setTimeout(() => (window.location.href = 'my-reports.html'), 1000);
      }
    });
  }
}
