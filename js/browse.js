document.addEventListener('DOMContentLoaded', () => {
  CampusFindStorage.seedDemoData();
  CampusFindUtils.initNav();

  const filterForm = document.getElementById('filter-form');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results');
  const resultsCount = document.getElementById('results-count');

  CampusFindFilters.populateLocationSelect(filterForm.querySelector('[name="filter-location"]'));

  function renderResults() {
    let items = CampusFindStorage.getItems();
    const query = searchInput.value.trim();

    if (query) {
      items = CampusFindSearch.search(items, query);
    }

    const filters = CampusFindFilters.getFilterValues(filterForm);
    items = CampusFindFilters.applyFilters(items, filters);

    resultsCount.textContent = `${items.length} item(s) found`;

    if (items.length === 0) {
      resultsContainer.innerHTML = `
        <div class="empty-state">
          <h3>No items found</h3>
          <p>Try adjusting your search or filters, or report a new item.</p>
          <div class="btn-group" style="justify-content: center;">
            <a href="report-lost.html" class="btn btn-primary">Report Lost</a>
            <a href="report-found.html" class="btn btn-secondary">Report Found</a>
          </div>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="items-grid">
        ${items.map((item) => CampusFindUtils.renderItemCard(item)).join('')}
      </div>
    `;
  }

  searchInput.addEventListener('input', renderResults);
  filterForm.addEventListener('change', renderResults);

  document.getElementById('clear-filters').addEventListener('click', () => {
    searchInput.value = '';
    filterForm.reset();
    renderResults();
  });

  renderResults();
});
