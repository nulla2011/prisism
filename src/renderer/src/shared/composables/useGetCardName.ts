export default (name: string) => {
  return name.match(/(?<=【)\S*(?=】)/)![0];
};
