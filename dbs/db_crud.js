const db_urls = require("./data/urls_db.json");
const db_users = require("./data/urls_users_db.json");

const shortenUrl = params => {
  let r = Math.random()
    .toString(36)
    .substring(1, 6);
  return r;
};

const crud_urls = {
  create(url) {
    db_urls["urls"][Object.keys(db_urls["urls"]).length] = {
      url: url,
      short: shortenUrl(url)
    };
  },
  isUrl(short) {
    const urlFound = Object.values(db_urls["urls"]).find(el => {
      return el.short === short;
    });
    if (urlFound.short === short) {
      return true;
    }
    return false;
  },
  findUrl(short) {
    const urlFound = Object.values(db_urls["urls"]).find(el => {
      return el.short === short;
    });
    if (urlFound.short === short) {
      return urlFound;
    }
    return undefined;
  },
  update(short, newUrl) {
    const idx = Object.values(db_urls["urls"]).indexOf(findUrl(short));
    if (idx) {
      Object.values(db_urls["urls"])[idx].url = newUrl;
      return true;
    }
    return false;
  },
  remove(short) {
    const idx = Object.values(db_urls["urls"]).indexOf(findUrl(short));
    if (idx) {
      delete db_urls["urls"][idx.toString()];
      return true;
    }
    return false;
  }
};
