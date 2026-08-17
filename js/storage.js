const CampusFindStorage = (() => {
  const ITEMS_KEY = 'campusfind_items';
  const SESSION_KEY = 'campusfind_session_id';
  const SEEDED_KEY = 'campusfind_seeded';

  const CATEGORIES = ['Electronics', 'Clothing', 'Documents', 'Keys', 'Bags', 'Other'];
  const LOCATIONS = ['Library', 'Cafeteria', 'Lab Block A', 'Sports Complex', 'Main Hall', 'Parking Lot', 'Student Centre'];

  function generateId() {
    return crypto.randomUUID();
  }

  function getSessionId() {
    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = generateId();
      localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  function getItems() {
    try {
      const data = localStorage.getItem(ITEMS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  function saveItems(items) {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }

  function getItemById(id) {
    return getItems().find((item) => item.id === id) || null;
  }

  function addItem(itemData) {
    const items = getItems();
    const newItem = {
      id: generateId(),
      type: itemData.type,
      name: itemData.name.trim(),
      category: itemData.category,
      description: itemData.description.trim(),
      location: itemData.location.trim(),
      date: itemData.date,
      image: itemData.image || null,
      contact: itemData.contact.trim(),
      status: 'active',
      reporterId: getSessionId(),
      createdAt: new Date().toISOString(),
      matchIds: [],
    };
    items.push(newItem);
    saveItems(items);
    return newItem;
  }

  function updateItem(id, patch) {
    const items = getItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    items[index] = { ...items[index], ...patch };
    saveItems(items);
    return items[index];
  }

  function updateStatus(id, status) {
    return updateItem(id, { status });
  }

  function deleteItem(id) {
    let items = getItems();
    items = items.filter((item) => item.id !== id);

    items = items.map((item) => ({
      ...item,
      matchIds: item.matchIds.filter((matchId) => matchId !== id),
      status: item.matchIds.includes(id) && item.matchIds.length === 1 ? 'active' : item.status,
    }));

    saveItems(items);
  }

  function getStats() {
    const items = getItems();
    return {
      total: items.length,
      lost: items.filter((i) => i.type === 'lost').length,
      found: items.filter((i) => i.type === 'found').length,
      recovered: items.filter((i) => i.status === 'recovered').length,
    };
  }

  function getRecentItems(count = 5) {
    return getItems()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, count);
  }

  function getItemsByReporter(reporterId) {
    return getItems()
      .filter((item) => item.reporterId === reporterId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getAllLocations() {
    const fromItems = getItems().map((item) => item.location);
    return [...new Set([...LOCATIONS, ...fromItems])].sort();
  }

  function seedDemoData() {
    if (localStorage.getItem(SEEDED_KEY)) return;

    const demoReporter = generateId();
    const demoItems = [
      {
        id: generateId(),
        type: 'lost',
        name: 'Black HP Laptop',
        category: 'Electronics',
        description: 'Black HP Pavilion laptop with a Strathmore sticker on the lid. Lost near the study area.',
        location: 'Library',
        date: '2026-08-15',
        image: null,
        contact: 'student@strathmore.edu',
        status: 'possible_match',
        reporterId: demoReporter,
        createdAt: new Date('2026-08-15T10:00:00').toISOString(),
        matchIds: [],
      },
      {
        id: generateId(),
        type: 'found',
        name: 'Black HP Laptop',
        category: 'Electronics',
        description: 'Found a black HP laptop on a table in the library. Has a university sticker.',
        location: 'Library',
        date: '2026-08-15',
        image: null,
        contact: 'finder@strathmore.edu',
        status: 'possible_match',
        reporterId: generateId(),
        createdAt: new Date('2026-08-15T14:30:00').toISOString(),
        matchIds: [],
      },
      {
        id: generateId(),
        type: 'lost',
        name: 'Blue Water Bottle',
        category: 'Other',
        description: 'Stainless steel blue water bottle with initials PW engraved.',
        location: 'Cafeteria',
        date: '2026-08-14',
        image: null,
        contact: 'peter.wachira@strathmore.edu',
        status: 'active',
        reporterId: getSessionId(),
        createdAt: new Date('2026-08-14T08:00:00').toISOString(),
        matchIds: [],
      },
      {
        id: generateId(),
        type: 'found',
        name: 'Student ID Card',
        category: 'Documents',
        description: 'Found a student ID card near the main hall entrance.',
        location: 'Main Hall',
        date: '2026-08-13',
        image: null,
        contact: 'security@strathmore.edu',
        status: 'recovered',
        reporterId: generateId(),
        createdAt: new Date('2026-08-13T16:00:00').toISOString(),
        matchIds: [],
      },
      {
        id: generateId(),
        type: 'lost',
        name: 'Car Keys',
        category: 'Keys',
        description: 'Toyota car keys with a red keychain. Lost in parking lot.',
        location: 'Parking Lot',
        date: '2026-08-12',
        image: null,
        contact: 'driver@strathmore.edu',
        status: 'active',
        reporterId: generateId(),
        createdAt: new Date('2026-08-12T11:00:00').toISOString(),
        matchIds: [],
      },
    ];

    demoItems[0].matchIds = [demoItems[1].id];
    demoItems[1].matchIds = [demoItems[0].id];

    saveItems(demoItems);
    localStorage.setItem(SEEDED_KEY, 'true');
  }

  return {
    CATEGORIES,
    LOCATIONS,
    generateId,
    getSessionId,
    getItems,
    getItemById,
    addItem,
    updateItem,
    updateStatus,
    deleteItem,
    getStats,
    getRecentItems,
    getItemsByReporter,
    getAllLocations,
    seedDemoData,
  };
})();

if (typeof module !== 'undefined') module.exports = CampusFindStorage;
