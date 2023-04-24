export default (name: string) => {
  return name.match(/(?<=【).*(?=】)/)![0];
};
