import needHashUrlPrefix from '@renderer/shared/constants/needHashUrlPrefix';

export default async (dir: string, name: string) => {
  for (let key in needHashUrlPrefix) {
    if (needHashUrlPrefix[key].some((prefix) => dir.startsWith(prefix))) {
      if (key === 'characters') {
        name = String(Number(name));
      }
      if (key === 'idols' && /^300\d{6}0$/.test(name)) {
        key = 'skins';
      }
      const hash = await window.api.queryHash(key, name);
      return hash;
    }
  }
  return null;
};
