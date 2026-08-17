document.addEventListener('DOMContentLoaded', () => {
  CampusFindStorage.seedDemoData();
  CampusFindUtils.initNav();

  renderReports();
});

function renderReports() {
  const container = document.getElementById('my-reports-list');
  const sessionId = CampusFindStorage.getSessionId();
  const reports = CampusFindStorage.getItemsByReporter(sessionId);

  if (reports.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No reports yet</h3>
        <p>You haven't reported any lost or found items. Start by creating a report.</p>
        <div class="btn-group" style="justify-content: center;">
          <a href="report-lost.html" class="btn btn-primary">Report Lost Item</a>
          <a href="report-found.html" class="btn btn-secondary">Report Found Item</a>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="items-grid">
      ${reports.map((item) => renderReportCard(item)).join('')}
    </div>
  `;

  container.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', handleAction);
  });
}

function renderReportCard(item) {
  const matches = CampusFindMatching.getMatchedItems(item);
  const matchIndicator =
    matches.length > 0
      ? `<div class="alert alert-warning" style="margin-top: var(--spacing-sm); padding: var(--spacing-sm);">🔎 ${matches.length} possible match(es)</div>`
      : '';

  return `
    <article class="card">
      <div class="card-body">
        <div class="card-meta">
          ${CampusFindUtils.getTypeBadge(item.type)}
          ${CampusFindUtils.getStatusBadge(item.status)}
        </div>
        <h3 class="card-title">${item.name}</h3>
        <div class="card-meta">
          <span>📍 ${item.location}</span>
          <span>📅 ${CampusFindUtils.formatDate(item.date)}</span>
        </div>
        ${matchIndicator}
        <div class="btn-group" style="margin-top: var(--spacing-md);">
          <a href="item.html?id=${item.id}" class="btn btn-outline btn-sm">View</a>
          ${
            item.status !== 'recovered'
              ? `<button data-action="recovered" data-id="${item.id}" class="btn btn-secondary btn-sm">Mark Recovered</button>`
              : ''
          }
          <button data-action="delete" data-id="${item.id}" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>
    </article>
  `;
}

function handleAction(e) {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;

  if (action === 'recovered') {
    CampusFindStorage.updateStatus(id, 'recovered');
    CampusFindUtils.showToast('Item marked as recovered!');
    renderReports();
  }

  if (action === 'delete') {
    if (confirm('Are you sure you want to delete this report?')) {
      CampusFindStorage.deleteItem(id);
      CampusFindUtils.showToast('Report deleted.');
      renderReports();
    }
  }
}
