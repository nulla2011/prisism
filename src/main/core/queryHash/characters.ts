export default (key: string) => {
  return global.hashResources.characters.find((e) => e.id === key).hash;
};
