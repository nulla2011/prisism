export const getFileName = (path: string) => {
  return path.split('/').at(-1)!.split('.')[0];
};
