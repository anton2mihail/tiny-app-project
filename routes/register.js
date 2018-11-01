const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");

router.get("/", (req, res) => {
  res.render("urls_register");
});

router.post("/", (req, res) => {
  users.create(req.body.username, req.body.password);
  res.cookie("user_id", req.body.username);
  res.redirect("/");
});

module.exports = router;
