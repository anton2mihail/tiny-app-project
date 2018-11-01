const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");

router.get("/", (req, res) => {
  res.render("urls_login", {
    username: req.cookies["username"]
  });
});
router.post("/", (req, res) => {
  console.log(req.body.password + ' This is the password');
  if (users.isUser(req.body.username, req.body.password)) {
    res.cookie("username", req.body.username);
    res.redirect("/urls");
  } else {
    res.redirect("/register");
  }
});

module.exports = router;
