const db_urls = require("./urls_db.json");

function remove(short) {
  const idx = Object.values(db_urls["urls"]).indexOf(findUrl(short));
  if (idx) {
    delete db_urls["urls"][idx.toString()];
    console.log(db_urls["urls"][idx.toString()]);
    return true;
  }
  return false;
}
function findUrl(short) {
  const urlFound = Object.values(db_urls["urls"]).find(el => {
    return el.short === short;
  });
  if (urlFound.short === short) {
    return urlFound;
  }
  return undefined;
}

console.log(remove("9sm5xK"));
