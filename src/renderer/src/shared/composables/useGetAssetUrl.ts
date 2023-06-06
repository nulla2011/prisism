import useGetUrlHash from './useGetUrlHash';

export default (filePath: string, hash?: string) => {
  let array = filePath.split('/');
  let fileName = array.pop()!;
  let path = array.join('/') + '/';
  let [name, ext] = fileName.split('.');
  return useGetUrlHash(path, name, ext, hash);
};
