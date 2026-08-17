const CampusFindFilters = (() => {
  function applyFilters(items, filters) {
    let result = [...items];

    if (filters.type && filters.type !== 'all') {
      result = result.filter((item) => item.type === filters.type);
    }

    if (filters.category && filters.category !== 'all') {
      result = result.filter((item) => item.category === filters.category);
    }

    if (filters.location && filters.location !== 'all') {
      result = result.filter((item) => item.location === filters.location);
    }

    if (filters.status && filters.status !== 'all') {
      result = result.filter((item) => item.status === filters.status);
    }

    if (filters.dateFrom) {
      result = result.filter((item) => item.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      result = result.filter((item) => item.date <= filters.dateTo);
    }

    return result;
  }

  function getFilterValues(form) {
    return {
      type: form.querySelector('[name="filter-type"]')?.value || 'all',
      category: form.querySelector('[name="filter-category"]')?.value || 'all',
      location: form.querySelector('[name="filter-location"]')?.value || 'all',
      status: form.querySelector('[name="filter-status"]')?.value || 'all',
      dateFrom: form.querySelector('[name="filter-date-from"]')?.value || '',
      dateTo: form.querySelector('[name="filter-date-to"]')?.value || '',
    };
  }

  function populateLocationSelect(selectEl) {
    if (!selectEl) return;
    const locations = CampusFindStorage.getAllLocations();
    selectEl.innerHTML = '<option value="all">All Locations</option>';
    locations.forEach((loc) => {
      const option = document.createElement('option');
      option.value = loc;
      option.textContent = loc;
      selectEl.appendChild(option);
    });
  }

  return { applyFilters, getFilterValues, populateLocationSelect };
})();

if (typeof module !== 'undefined') module.exports = CampusFindFilters;
