const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:" + PORT;

router.get("/", (req, res) => {
  if (req.session.user_id) {
    res.render("urls_index", {
      username: req.session.user_id,
      urls: urls.getUrlsPerUser(req.session.user_id),
      newUrl: null,
      publicUrl: PUBLIC_URL
    });
  } else {
    res.render("urls_index", {
      username: null,
      urls: urls.all(),
      newUrl: null,
      publicUrl: PUBLIC_URL
    });
  }
});

router.post("/", (req, res) => {
  if (req.body.url != "") {
    console.log("Url almost created" + req.session.user_id);
    if (req.session.user_id && users.isRegisteredUser(req.session.user_id)) {
      urls.create(req.body.url, req.session.user_id);
    } else {
      urls.createTemp(req.body.url);
    }
  }
  res.redirect("/urls");
});

router.get("/new", (req, res) => {
  if (req.session.user_id) {
    res.render("urls_index", {
      username: req.session.user_id,
      urls: urls.getUrlsPerUser(req.session.user_id),
      newUrl: "t",
      publicUrl: PUBLIC_URL
    });
  } else {
    res.render("urls_index", {
      username: null,
      urls: urls.all(),
      newUrl: "t",
      publicUrl: PUBLIC_URL
    });
  }
});

router.delete("/:shortURL", (req, res) => {
  if (req.session.user_id) {
    users.removeUrl(req.session.user_id, req.params.shortURL);
  } else {
    urls.remove(req.params.shortURL);
  }
  res.redirect("./");
});

router.get("/:shortURL", (req, res) => {
  if (urls.isUrl(req.params.shortURL)) {
    if (req.session && req.session.user_id) {
      var templateVars = {
        username: req.session.user_id,
        shortURL: req.params.shortURL,
        longURL: urls.findUrl(req.params.shortURL)
      };
    } else {
      var templateVars = {
        username: null,
        shortURL: req.params.shortURL,
        longURL: urls.findUrl(req.params.shortURL)
      };
    }
    res.render("urls_show", templateVars);
  } else {
    res.redirect("./");
  }
});

router.put("/:shortURL", (req, res) => {
  urls.update(req.params.shortURL, req.body.newURL);
  res.redirect("./");
});

module.exports = router;
