const db_urls = require("./data/urls_db.json");
const db_users = require("./data/urls_users_db.json");
const bcrypt = require('bcrypt');


const shortenUrl = url => {
  let encoded = (Math.random() * 1e16).toString(36);
  return encoded;
};

const crud_urls = {
  create(url, username) {
    const short = shortenUrl(url);
    db_urls[short] = {
      url: url
    };
    crud_users.addNewUrl(username, short);
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
  getUrlsPerUser(username) {
    let obj = {};
    if (db_users[username]) {
      if (db_users[username].urls) {
        db_users[username].urls.forEach(el => {
          obj[el] = {
            url: db_urls[el].url
          }
        });
        return obj;
      }
    }
    return undefined;
  },
  all() {
    return db_urls;
  }
};

const crud_users = {
  create(username, password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    console.log(hash);
    db_users[username] = {
      password: hash,
      urls: ["b2xVn2", "9sm5xK"]
    };
    return true;
  },
  hasUrl(username, short) {
    let res = false;
    if (db_users[username]) {
      if (db_users[username].urls) {
        res = db_users[username].urls.find(el => {
          return el === short;
        });
      }
    }
    return res;
  },
  isUser(username, password) {
    let result = '';
    if (db_users[username]) {
      result = bcrypt.compareSync(password, db_users[username].password);
      console.log(result);
      return result;
    }
    return false;
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
  },
  removeUrl(username, url) {
    if (db_users[username].urls.includes(url)) {
      let idx = db_users[username].urls.indexOf(url);
      db_users[username].urls.splice(idx, 1);
      return true;
    }
    return false;
  }
};

module.exports = {
  urls: crud_urls,
  users: crud_users
};
