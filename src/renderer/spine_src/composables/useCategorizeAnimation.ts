const statusList = ['cheek_red', 'mask_on', 'mask_off', 'off_bag', 'on_bag'];
export default (list: string[]) => {
  const anm: { [key: string]: string[] } = {
    main: [],
    face: [],
    status: [],
    eye: [],
    lip: [],
  };
  for (const name of list) {
    if (name.startsWith('face_')) {
      anm.face.push(name);
    } else if (name.startsWith('yes') || name.startsWith('no') || statusList.includes(name)) {
      anm.status.push(name);
    } else if (name.startsWith('eye_')) {
      anm.eye.push(name);
    } else if (name.startsWith('lip_')) {
      anm.lip.push(name);
    } else if (name !== 'blank') {
      anm.main.push(name);
    }
  }
  for (const t of Object.keys(anm)) {
    anm[t].unshift('blank');
  }
  return anm;
};
