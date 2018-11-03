const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");
const { createUnique } = require("../methods/session_id");

router.get("/", (req, res) => {
  res.render("urls_login", {
    username: req.session.user_id
  });
});
router.post("/", (req, res) => {
  let obj = users.isUser(req.body.username, req.body.password);
  if (obj.username && obj.password) {
    req.session.session_id = createUnique();
    req.session.user_id = req.body.username;
    res.redirect("./urls");
  } else if (obj.username) {
    res.send("Sorry Incorrect Password <a href='/login'>Back</a>");
  } else if (obj.password) {
    res.send("Sorry Incorrect Username <a href='/login'>Back</a>");
  } else {
    res.send("Please Register an account first. <a href='/login'>Back</a>");
  }
});

module.exports = router;
