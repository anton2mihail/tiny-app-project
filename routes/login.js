const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");
const { createUnique } = require('../methods/session_id');

router.get("/", (req, res) => {
  res.render("urls_login", {
    username: req.session.user_id
  });
});
router.post("/", (req, res) => {
  if (users.isUser(req.body.username, req.body.password)) {
    req.session.session_id = createUnique();
    req.session.user_id = req.body.username;
    res.redirect("/urls");
  } else {
    res.redirect("/register");
  }
});

module.exports = router;
