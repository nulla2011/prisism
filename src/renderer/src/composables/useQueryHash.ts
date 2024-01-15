import needHashUrlPrefix from '@renderer/shared/constants/needHashUrlPrefix';

export default async (dir: string, name: string) => {
  for (const key in needHashUrlPrefix) {
    if (needHashUrlPrefix[key].some((prefix) => dir.startsWith(prefix))) {
      const hash = await window.api.queryHash(key, name);
      return hash;
    }
  }
  return null;
};
