const express = require("express");
// This is needed by express to use these routes
const router = express.Router();
//These are the database method objects
const { urls, users } = require("../dbs/db_crud");
// Setting up environment variables
require("dotenv").config();
// if env variable exists use that, otherwise use 5000
const PORT = process.env.PORT || 5000;
// Url to prefix the short urls for the redirects
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:" + PORT;

// Get method on '/urls'
router.get("/", (req, res) => {
  // If there is a user session currently,and the user is registered then render the index otherwise redirect to the login page
  if (req.session.user_id && users.isRegisteredUser(req.session.user_id)) {
    res.render("urls_index", {
      username: req.session.user_id,
      urls: urls.getUrlsPerUser(req.session.user_id),
      newUrl: null,
      publicUrl: PUBLIC_URL
    });
  } else {
    res.redirect(403, "./login");
  }
});

// Post method for the urls endpoint that creates a new url
router.post("/", (req, res) => {
  if (req.body.url != "" && req.session.user_id) {
    urls.create(req.body.url, req.session.user_id);
  }
  res.redirect("/urls");
});

// Get method for '/urls/new' endpoint that displays a form for a user to enter a new url
router.get("/new", (req, res) => {
  if (req.session.user_id) {
    res.render("urls_index", {
      username: req.session.user_id,
      urls: urls.getUrlsPerUser(req.session.user_id),
      newUrl: "t",
      publicUrl: PUBLIC_URL
    });
  } else {
    res.redirect("/login");
  }
});

// DELETE method for the '/urls/shortURL' endpoint that basically deletes a url for a user
router.delete("/:shortURL", (req, res) => {
  // If the user owns the url then delete it
  if (users.hasUrl(req.session.user_id, req.params.shortURL)) {
    users.removeUrl(req.session.user_id, req.params.shortURL);
  }
  res.redirect("./");
});

// Get method for the '/urls/shortURL' endpoint that displays a page where a user can edit a url and update it
router.get("/:shortURL", (req, res) => {
  // This can only happen if the user owns the url otherwise they are redirected to the '/urls' endpoint
  if (
    req.session.user_id &&
    users.hasUrl(req.session.user_id, req.params.shortURL)
  ) {
    let templateVars = {
      username: req.session.user_id,
      shortURL: req.params.shortURL,
      longURL: urls.findUrl(req.params.shortURL)
    };
    res.render("urls_show", templateVars);
  } else {
    res.redirect("./");
  }
});

//Put method for the '/urls/shortURL' endpoint that updates a users url
router.put("/:shortURL", (req, res) => {
  urls.update(req.params.shortURL, req.body.newURL);
  res.redirect("./");
});

module.exports = router;
