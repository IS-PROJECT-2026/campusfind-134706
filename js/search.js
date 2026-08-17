const CampusFindSearch = (() => {
  function tokenize(query) {
    return query
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((token) => token.length > 0);
  }

  function scoreItem(item, tokens) {
    if (tokens.length === 0) return 1;

    const searchText = `${item.name} ${item.description}`.toLowerCase();
    let matched = 0;

    tokens.forEach((token) => {
      if (searchText.includes(token)) matched += 1;
    });

    return matched / tokens.length;
  }

  function search(items, query) {
    const tokens = tokenize(query);
    if (tokens.length === 0) return items;

    return items
      .map((item) => ({ item, score: scoreItem(item, tokens) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  }

  return { tokenize, search, scoreItem };
})();

if (typeof module !== 'undefined') module.exports = CampusFindSearch;
