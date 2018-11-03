const db_urls = require("./data/urls_db.json");
const db_users = require("./data/urls_users_db.json");
const bcrypt = require("bcrypt");

const shortenUrl = url => {
  let encoded = (Math.random() * 1e16).toString(36);
  return encoded;
};

const crud_urls = {
  /**
   *
   *
   * @param {*} url
   * @param {*} username
   */
  create(url, username) {
    const short = shortenUrl(url);
    db_urls[short] = {
      url: url
    };
    crud_users.addNewUrl(username, short);
  },
  /**
   *
   *
   * @param {*} short
   * @returns Long Url or Undefined
   */
  findUrl(short) {
    if (db_urls[short]) {
      return db_urls[short].url;
    }
    return undefined;
  },
  /**
   *
   *
   * @param {*} short
   * @param {*} newUrl
   * @returns BOOLEAN
   */
  update(short, newUrl) {
    if (db_urls[short]) {
      db_urls[short].url = newUrl;
      return true;
    }
    return false;
  },
  /**
   *
   *
   * @param {*} username
   * @returns Object containing the urls for the user Or Undefined
   */
  getUrlsPerUser(username) {
    let obj = {};
    if (db_users[username]) {
      if (db_users[username].urls) {
        db_users[username].urls.forEach(el => {
          obj[el] = {
            url: db_urls[el].url
          };
        });
        return obj;
      }
    }
    return undefined;
  }
};

const crud_users = {
  /**
   *
   *
   * @param {*} username
   * @param {*} password
   * @returns True
   */
  create(username, password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    db_users[username] = {
      password: hash,
      urls: ["b2xVn2", "9sm5xK"]
    };
    return true;
  },
  /**
   *
   *
   * @param {*} username
   * @param {*} short
   * @returns res | BOOLEAN
   */
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
  /**
   *
   *
   * @param {*} username
   * @param {*} password
   * @returns result
   *    with two params containing BOOLEAN values, representing the validity of the provided params
   */
  isUser(username, password) {
    let result = {
      username: false,
      password: false
    };
    if (db_users[username] !== undefined) {
      result.username = true;
      var resp = bcrypt.compareSync(password, db_users[username].password);
      result.password = resp;
    }
    return result;
  },
  /**
   *
   *
   * @param {*} username
   * @returns result
   *      Containing a property that is a BOOLEAN representing the validity of the params
   */
  isRegisteredUser(username) {
    let result = {
      username: false
    };
    if (db_users[username]) {
      result.username = true;
    }
    return result;
  },
  /**
   *
   *
   * @param {*} username
   * @param {*} newUrl
   * @returns BOOLEAN
   *   True || False
   */
  addNewUrl(username, newUrl) {
    if (db_users[username]) {
      db_users[username].urls.push(newUrl);
      return true;
    }
    return false;
  },
  /**
   *
   *
   * @param {*} username
   * @param {*} url
   * @returns BOOLEAN
   *   True || False
   */
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
