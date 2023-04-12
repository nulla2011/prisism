import groups from '../constants/group';
import idols from '../constants/idols';
export default (group: string) => {
  let id = Object.keys(groups).findIndex((el) => el === group) + 1;
  let list = [];
  for (const idol of idols) {
    if (parseInt(idol.unitId) === id) {
      list.push(idol);
    }
  }
  return list;
};
