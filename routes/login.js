var express = require("express");
var router = express.Router();
const { urls, users } = require("./dbs/db_crud");

router.get("/", (req, res) => {
  res.render("urls_login", {
    username: req.cookies["username"]
  });
});
router.post("/", (req, res) => {
  if (users.isUser(req.body.username)) {
    res.cookie("username", req.body.username);
    res.redirect("/urls");
  } else {
    res.redirect("/register");
  }
});

module.exports = router;
