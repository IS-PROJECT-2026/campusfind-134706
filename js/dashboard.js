document.addEventListener('DOMContentLoaded', () => {
  CampusFindStorage.seedDemoData();
  CampusFindUtils.initNav();

  const stats = CampusFindStorage.getStats();

  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-lost').textContent = stats.lost;
  document.getElementById('stat-found').textContent = stats.found;
  document.getElementById('stat-recovered').textContent = stats.recovered;

  const recentContainer = document.getElementById('recent-items');
  const recentItems = CampusFindStorage.getRecentItems(5);

  if (recentItems.length === 0) {
    recentContainer.innerHTML = `
      <div class="empty-state">
        <h3>No items reported yet</h3>
        <p>Be the first to report a lost or found item on campus.</p>
        <div class="btn-group" style="justify-content: center;">
          <a href="report-lost.html" class="btn btn-primary">Report Lost Item</a>
          <a href="report-found.html" class="btn btn-secondary">Report Found Item</a>
        </div>
      </div>
    `;
    return;
  }

  recentContainer.innerHTML = recentItems
    .map(
      (item) => `
      <div class="recent-item">
        <div class="recent-item-info">
          <span>${CampusFindUtils.getCategoryIcon(item.category)}</span>
          <div>
            <strong>${item.name}</strong>
            <div class="card-meta">
              ${CampusFindUtils.getTypeBadge(item.type)}
              <span>📍 ${item.location}</span>
              <span>📅 ${CampusFindUtils.formatDate(item.date)}</span>
            </div>
          </div>
        </div>
        <a href="item.html?id=${item.id}" class="btn btn-outline btn-sm">View</a>
      </div>
    `
    )
    .join('');
});
