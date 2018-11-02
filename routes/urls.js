const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:" + PORT;

router.get("/", (req, res) => {
  if (req.session.isPopulated) {
    res.render("urls_index", {
      username: req.session.user_id,
      urls: urls.getUrlsPerUser(req.session.user_id),
      newUrl: null,
      publicUrl: PUBLIC_URL
    });
  } else {
    res.redirect(403, "./login");
  }
});

router.post("/", (req, res) => {
  if (req.body.url != "" && !req.session.isChanged) {
    urls.create(req.body.url, req.session.user_id);
  }
  res.redirect("./");
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
    res.redirect("/login");
  }
});

router.delete("/:shortURL", (req, res) => {
  if (users.hasUrl(req.session.user_id, req.params.shortURL)) {
    users.removeUrl(req.session.user_id, req.params.shortURL);
  }
  res.redirect("./");
});

router.get("/:shortURL", (req, res) => {
  if (
    req.session.user_id &&
    users.hasUrl(req.session.user_id, req.params.shortURL)
  ) {
    let templateVars = {
      username: req.session.user_id,
      shortURL: req.params.shortURL,
      longURL: urls.findUrl(req.params.shortURL)
    };
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
