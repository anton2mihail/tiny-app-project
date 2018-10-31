const db_urls = require("./urls_db.json");

const shortenUrl = params => {
  let r = Math.random()
    .toString(36)
    .substring(1, 6);
  return r;
};

function create(url, user) {
  const newIdx = Object.keys(db_urls["urls"]).length;
  db_urls["urls"][newIdx] = {
    url: url,
    short: shortenUrl(url)
  };
  // crud_users.update(user, db_urls["urls"][newIdx].short);
}

console.log(
  create(
    "https://stackoverflow.com/questions/7163061/is-there-a-require-for-json-in-node-js",
    "admin@ad.com"
  )
);
console.log(db_urls);
