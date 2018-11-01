const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");
const { createUnique } = require('../methods/session_id');

router.get("/", (req, res) => {
  res.render("urls_register");
});

router.post("/", (req, res) => {
  users.create(req.body.username, req.body.password);
  req.session.session_id = createUnique();
  req.session.user_id = req.body.username;
  res.redirect("/");
});

module.exports = router;
