const express = require("express");
// This is needed by express to use these routes
const router = express.Router();
//These are the database method objects
const { urls, users } = require("../dbs/db_crud");

//Get method for the '/go/id' endpoint which redirects someone who has used the short urls to the
// actual url that was initially shortened
router.get("/:id", (req, res) => {
  let redirect = urls.findUrl(req.params.id);
  res.redirect(redirect);
});

module.exports = router;
