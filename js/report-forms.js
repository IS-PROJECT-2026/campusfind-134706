const CampusFindForms = (() => {
  function populateCategorySelect(selectEl) {
    if (!selectEl) return;
    selectEl.innerHTML = '<option value="">Select category</option>';
    CampusFindStorage.CATEGORIES.forEach((cat) => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      selectEl.appendChild(option);
    });
  }

  function populateLocationDatalist(datalistEl) {
    if (!datalistEl) return;
    datalistEl.innerHTML = '';
    CampusFindStorage.getAllLocations().forEach((loc) => {
      const option = document.createElement('option');
      option.value = loc;
      datalistEl.appendChild(option);
    });
  }

  function showValidationErrors(errors) {
    document.querySelectorAll('.form-error').forEach((el) => el.remove());

    Object.entries(errors).forEach(([field, message]) => {
      const input = document.querySelector(`[name="${field}"]`);
      if (!input) return;
      const error = document.createElement('p');
      error.className = 'form-error';
      error.textContent = message;
      input.parentElement.appendChild(error);
    });
  }

  function validateForm(form) {
    const data = {
      name: form.querySelector('[name="name"]').value,
      category: form.querySelector('[name="category"]').value,
      description: form.querySelector('[name="description"]').value,
      location: form.querySelector('[name="location"]').value,
      date: form.querySelector('[name="date"]').value,
      contact: form.querySelector('[name="contact"]').value,
    };

    const errors = CampusFindUtils.validateRequired(data);
    showValidationErrors(errors);
    return Object.keys(errors).length === 0 ? data : null;
  }

  function validateEmailFormat(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function initReportForm(formId, type) {
    const form = document.getElementById(formId);
    if (!form) return;

    populateCategorySelect(form.querySelector('[name="category"]'));
    populateLocationDatalist(document.getElementById('location-list'));

    const dateInput = form.querySelector('[name="date"]');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
      dateInput.max = new Date().toISOString().split('T')[0];
    }

    const imageInput = form.querySelector('[name="image"]');
    const preview = document.getElementById('image-preview');

    if (imageInput && preview) {
      imageInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) {
          preview.innerHTML = '';
          return;
        }
        const dataUrl = await CampusFindUtils.readImageFile(file);
        preview.innerHTML = `<img src="${dataUrl}" alt="Preview">`;
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = validateForm(form);
      if (!data) return;

      if (!validateEmailFormat(data.contact)) {
        showValidationErrors({ contact: 'Please enter a valid email address' });
        return;
      }

      const imageFile = form.querySelector('[name="image"]').files[0];
      const image = await CampusFindUtils.readImageFile(imageFile);

      const newItem = CampusFindStorage.addItem({
        ...data,
        type,
        image,
      });

      const matches = CampusFindMatching.flagMatches(newItem);

      if (matches.length > 0) {
        CampusFindUtils.showToast(`Report submitted! ${matches.length} possible match(es) found.`);
      } else {
        CampusFindUtils.showToast('Report submitted successfully!');
      }

      setTimeout(() => {
        window.location.href = `item.html?id=${newItem.id}`;
      }, 1500);
    });
  }

  function getValidationSummary(errors) {
    const keys = Object.keys(errors);
    if (keys.length === 0) return '';
    return `Please fix ${keys.length} field(s) before submitting.`;
  }

  return {
    populateCategorySelect,
    populateLocationDatalist,
    validateForm,
    validateEmailFormat,
    initReportForm,
  };
})();

if (typeof module !== 'undefined') module.exports = CampusFindForms;
