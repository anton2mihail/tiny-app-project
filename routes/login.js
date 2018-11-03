const express = require("express");
// This is needed by express to use these routes
const router = express.Router();
//These are the database method objects
const { urls, users } = require("../dbs/db_crud");
const { createUnique } = require("../methods/session_id");

// Get method for the '/login' endpoint, and this simply renders the login page
router.get("/", (req, res) => {
  res.render("urls_index", {
    username: undefined
  });
});

router.post("/", (req, res) => {
  let obj = users.isUser(req.body.username, req.body.password);
  if (obj.username && obj.password) {
    req.session.session_id = createUnique();
    req.session.user_id = req.body.username;
    res.redirect("./urls");
  } else if (obj.username) {
    res.send("Sorry Incorrect Password");
  } else if (obj.password) {
    res.send("Sorry Incorrect Username");
  } else {
    res.send("Please Register an account first.");
  }
});

module.exports = router;
