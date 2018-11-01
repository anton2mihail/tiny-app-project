const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");
const { createUnique } = require('../methods/session_id');

// TODO: CHANGE PROPERTY NAME TO 'UNIQUE'
router.get("/", (req, res) => {
  res.render("urls_login", {
    username: req.session.user_id
  });
});
router.post("/", (req, res) => {
  // TODO: SEND PASSWORD SECURELY THROUGH HTTPS
  if (users.isUser(req.body.username, req.body.password)) {
    console.log(req.session);
    req.session.session_id = 'hello';
    console.log(req.session);
    req.session.user_id = req.body.username;
    //aconsole.log(req.session);
    //res.redirect("/urls");
    res.sendStatus('200');
  } else {
    res.redirect("/register");
  }
});

module.exports = router;
