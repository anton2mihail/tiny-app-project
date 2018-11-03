const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");
const { createUnique } = require("../methods/session_id");
const PORT = process.env.PORT || 5000;
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:" + PORT;

router.get("/", (req, res) => {
  res.redirect("../login");
});
router.post("/", (req, res) => {
  let resp = users.isRegisteredUser(req.body.username);
  if (resp.username) {
    res.send("User email already in use. Please try again, or login");
  } else {
    users.create(req.body.username, req.body.password);
    req.session.session_id = createUnique();
    req.session.user_id = req.body.username;
    res.redirect("./urls");
  }
});

module.exports = router;
