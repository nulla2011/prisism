const getHash = (category: hashCategories, id: string, key = 'id') => {
  return global.hashResources[category].find((e) => e[key] === id).hash;
};
export default (category: hashCategories, id: string) => {
  switch (category) {
    case 'idolEvolutionPieces':
      return getHash(category, id, 'idolId');
    case 'characters':
    case 'idols':
    case 'supportIdols':
    case 'concertBgm':
    case 'comics':
    default:
      return getHash(category, id);
  }
};
