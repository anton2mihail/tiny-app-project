const express = require("express");
const app = express();
const bd = require("body-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const { urls, users } = require("./dbs/db_crud");
const register = require("./routes/register");
const login = require("./routes/login");
require('dotenv').config();
const redirect = require('./routes/short-redirects');
const PORT = process.env.PORT || 5000; // default port 5000
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:" + PORT;
const COOKIE_KEY = process.env.COOKIE_KEY;


app.use(bd.json());
app.use(bd.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: [COOKIE_KEY]
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/urls");
});
app.use('/go', redirect);
app.use("/register", register);
app.use("/login", login);

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

app.get("/urls", (req, res) => {
  if (req.session.isPopulated) {
    res.render("urls_index", {
      username: req.session.user_id,
      urls: urls.getUrlsPerUser(req.session.user_id),
      newUrl: null,
      publicUrl: PUBLIC_URL
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/urls", (req, res) => {
  if (req.body.url != "" && !req.session.isChanged) {
    urls.create(req.body.url, req.session.user_id);
  }
  res.redirect("/urls");
});

app.get("/urls/new", (req, res) => {
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

app.post("/urls/:id/delete", (req, res) => {
  if (users.hasUrl(req.session.user_id, req.params.id)) {
    users.removeUrl(req.session.user_id, req.params.id);
  }
  res.redirect("/urls");
});

app.get("/urls/:shortURL", (req, res) => {
  if (req.session.user_id && users.hasUrl(req.session.user_id, req.params.shortURL)) {
    let templateVars = {
      username: req.session.user_id,
      shortURL: req.params.shortURL,
      longURL: urls.findUrl(req.params.shortURL)
    };
    res.render("urls_show", templateVars);
  } else {
    res.redirect("/urls");
  }
});

app.post("/urls/:shortURL", (req, res) => {
  urls.update(req.params.shortURL, req.body.newURL);
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
