export default function cleanSet(set, startString) {
  if (!startString || !(set instanceof Set)) {
    return '';
  }

  const values = [];

  for (const value of set) {
    if (typeof value === 'string' && value.startsWith(startString)) {
      values.push(value.slice(startString.length));
    }
  }

  return values.join('-');
}
