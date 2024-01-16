const getHash = (category: hashCategories, id: string, key = 'id') => {
  return global.hashResources[category].find((e) => e[key] === id).hash;
};
const getSkinHash = (id: string) => {
  return global.hashResources.skins.find((e) => e.skinCharacters[0].id === id).skinCharacters[0]
    .hash;
};
export default (category: hashCategories, id: string) => {
  switch (category) {
    case 'idolEvolutionPieces':
      return getHash(category, id, 'idolId');
    case 'skins':
      return getSkinHash(id);
    case 'characters':
    case 'idols':
    case 'supportIdols':
    case 'concertBgm':
    case 'comics':
    default:
      return getHash(category, id);
  }
};
