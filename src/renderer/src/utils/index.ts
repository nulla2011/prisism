export const getFileName = (path: string) => {
  return path.split('/').at(-1)!.split('.')[0];
};
export const getExt = (path: string) => {
  return path.split('.').at(-1);
};
