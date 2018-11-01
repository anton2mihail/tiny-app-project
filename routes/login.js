const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");
const { createUnique } = require('../methods/session_id');

// TODO: CHANGE PROPERTY NAME TO 'UNIQUE'
router.get("/", (req, res) => {
  res.render("urls_login", {
<<<<<<< HEAD
    username: req.cookies["user_id"]
=======
    username: req.session.user_id
>>>>>>> feature/unique
  });
});
router.post("/", (req, res) => {
  // TODO: SEND PASSWORD SECURELY THROUGH HTTPS
  if (users.isUser(req.body.username, req.body.password)) {
<<<<<<< HEAD
    res.cookie("user_id", req.body.username);
=======
    req.session.session_id = createUnique();
    req.session.user_id = req.body.username;
>>>>>>> feature/unique
    res.redirect("/urls");
  } else {
    res.sendStatus(403);
    res.redirect("/register");
  }
});

module.exports = router;
