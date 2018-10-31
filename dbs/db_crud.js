const db_urls = require("./data/urls_db.json");
const db_users = require("./data/urls_users_db.json");

const shortenUrl = params => {
  let encoded = Buffer.from(params).toString("base64");
  return encoded;
};

const crud_urls = {
  create(url, user) {
    const short = shortenUrl(url);
    db_urls[short] = {
      url: url
    };
    crud_users.addNewUrl(user, short);
  },
  isUrl(short) {
    return !!db_urls[short];
  },
  findUrl(short) {
    if (db_urls[short]) {
      return db_urls[short].url;
    }
    return undefined;
  },
  update(short, newUrl) {
    if (db_urls[short]) {
      db_urls[short].url = newUrl;
      return true;
    }
    return false;
  },
  remove(short) {
    if (db_urls[short]) {
      delete db_urls[short];
      return true;
    }
    return false;
  },
  all() {
    return db_urls;
  }
};

const crud_users = {
  create(username, password) {
    db_users[username] = {
      password: password,
      urls: ["b2xVn2", "9sm5xK"]
    };
  },
  isUser(username) {
    return !!db_users[username];
  },
  findUser(username) {
    if (db_users[username]) {
      return db_users[username];
    }
    return false;
  },
  addNewUrl(username, newUrl) {
    if (db_users[username]) {
      db_users[username].urls.push(newUrl);
      return true;
    }
    return false;
  }
};

module.exports = {
  urls: crud_urls,
  users: crud_users
};
