export default (list: string[]) => {
  const anm: { [key: string]: string[] } = {
    main: [],
    face: [],
    yes_or_no: [],
    eye: [],
    lip: [],
  };
  for (const name of list) {
    if (name.startsWith('face_')) {
      anm.face.push(name);
    } else if (name.startsWith('yes') || name.startsWith('no')) {
      anm.yes_or_no.push(name);
    } else if (name.startsWith('eye_')) {
      anm.eye.push(name);
    } else if (name.startsWith('lip_')) {
      anm.lip.push(name);
    } else {
      anm.main.push(name);
    }
  }
  for (const t of Object.keys(anm).filter((v) => v !== 'main')) {
    anm[t].push('blank');
  }
  return anm;
};
