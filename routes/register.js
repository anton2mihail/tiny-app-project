const express = require("express");
// This is needed by express to use these routes
const router = express.Router();
//These are the database method objects
const { urls, users } = require("../dbs/db_crud");
const { createUnique } = require("../methods/session_id");

// Post method for '/register endpoint'
router.post("/", (req, res) => {
  //Checks to make sure that user is not already registered
  let resp = users.isRegisteredUser(req.body.username);
  if (resp.username) {
    res.send("User email already in use. Please try again, or login");
  } else {
    users.create(req.body.username, req.body.password);
    //Set the session cookies for each user
    req.session.session_id = createUnique();
    // Sets a session cookie for the user_id (username)
    req.session.user_id = req.body.username;
    res.redirect("./urls");
  }
});

module.exports = router;
