//TODO: It seems the names of these functions must be
//TODO: get, post, put, or del.
//TODO: Is patch supported?
export function get(req, res, next) {
  console.log('about.json.js get: req =', req);
  const favorites = {color: 'yellow', number: 19};
  res.end(JSON.stringify(favorites));
}
