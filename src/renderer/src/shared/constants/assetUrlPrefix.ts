let string = 'tijozdpmpst/fo{b/gvo';
let newstring = '';
for (const c of string) {
  newstring = newstring + String.fromCharCode(c.charCodeAt(0) - 1);
}
export default `https://${newstring}/assets/`;
