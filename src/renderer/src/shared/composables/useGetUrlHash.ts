import URL_PREFIX from '../constants/assetUrlPrefix';
import sha256 from 'crypto-js/sha256';
export default (path: string, name: string, ext: string, hash?: string) => {
  if (hash) {
    name = hash + '_' + name;
  }
  // const data = new TextEncoder().encode(`${name[0]}${name.at(-1)}/assets/${path}${name}.${ext}`);
  const string = `${name[0]}${name[name.length - 1]}/assets/${path}${name}.${ext}`;
  // const b = await crypto.subtle.digest('SHA-256', data);
  // const hashArray = Array.from(new Uint8Array(b));
  // const hashedString = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  const hashedString = sha256(string).toString();
  return URL_PREFIX + hashedString + (ext === 'mp4' || ext === 'm4a' ? '.' + ext : '');
};
