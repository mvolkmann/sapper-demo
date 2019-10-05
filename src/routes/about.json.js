export function get(req, res) {
  const obj = {color: 'yellow', number: 19};
  res.end(JSON.stringify(obj));
}
