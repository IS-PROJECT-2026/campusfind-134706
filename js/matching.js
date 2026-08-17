const CampusFindMatching = (() => {
  const MATCH_THRESHOLD = 60;

  function tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 1);
  }

  function nameOverlapScore(nameA, nameB) {
    const tokensA = new Set(tokenize(nameA));
    const tokensB = new Set(tokenize(nameB));
    if (tokensA.size === 0 || tokensB.size === 0) return 0;

    let shared = 0;
    tokensA.forEach((t) => {
      if (tokensB.has(t)) shared += 1;
    });

    const union = new Set([...tokensA, ...tokensB]).size;
    return Math.round((shared / union) * 40);
  }

  function daysBetween(dateA, dateB) {
    const a = new Date(dateA + 'T00:00:00');
    const b = new Date(dateB + 'T00:00:00');
    return Math.abs((a - b) / (1000 * 60 * 60 * 24));
  }

  function calculateScore(itemA, itemB) {
    if (itemA.type === itemB.type) return 0;

    let score = 0;

    if (itemA.category === itemB.category) score += 30;
    score += nameOverlapScore(itemA.name, itemB.name);
    if (itemA.location.toLowerCase() === itemB.location.toLowerCase()) score += 20;
    if (daysBetween(itemA.date, itemB.date) <= 3) score += 10;

    return Math.max(0, score);
  }

  function findMatchesForItem(item) {
    const items = CampusFindStorage.getItems();
    const oppositeType = item.type === 'lost' ? 'found' : 'lost';

    return items
      .filter((other) => other.id !== item.id && other.type === oppositeType)
      .map((other) => ({ item: other, score: calculateScore(item, other) }))
      .filter(({ score }) => score >= MATCH_THRESHOLD)
      .sort((a, b) => b.score - a.score);
  }

  function flagMatches(item) {
    const matches = findMatchesForItem(item);
    const matchIds = matches.map(({ item: m }) => m.id);

    if (matchIds.length === 0) return matches;

    CampusFindStorage.updateItem(item.id, {
      status: 'possible_match',
      matchIds,
    });

    matches.forEach(({ item: matchedItem }) => {
      const existingIds = matchedItem.matchIds || [];
      const updatedIds = [...new Set([...existingIds, item.id])];
      CampusFindStorage.updateItem(matchedItem.id, {
        status: 'possible_match',
        matchIds: updatedIds,
      });
    });

    return matches;
  }

  function getMatchedItems(item) {
    if (!item.matchIds || item.matchIds.length === 0) return [];
    return item.matchIds
      .map((id) => CampusFindStorage.getItemById(id))
      .filter(Boolean);
  }

  return {
    MATCH_THRESHOLD,
    calculateScore,
    findMatchesForItem,
    flagMatches,
    getMatchedItems,
  };
})();

if (typeof module !== 'undefined') module.exports = CampusFindMatching;
