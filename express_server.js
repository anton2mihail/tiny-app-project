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
const PORT = process.env.PORT || 5000; // default port 8080
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:" + PORT;
const COOKIE_KEY = process.env.COOKIE_KEY;
//Admin Password 'root'

app.use(bd.json());
app.use(bd.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: [COOKIE_KEY]
}));

//app.use(session({
//  secret: COOKIE_KEY,
//  resave: false,
//  saveUninitialized: false,
//  cookie: {}
//}))

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
<<<<<<< HEAD
  res.clearCookie("user_id");
=======
  req.session = null;
>>>>>>> feature/unique
  res.redirect("/login");
});

app.get("/urls", (req, res) => {
<<<<<<< HEAD
  if (req.cookies["user_id"]) {
    res.render("urls_index", {
      username: req.cookies["user_id"],
      urls: urls.getUrlsPerUser(req.cookies["user_id"]),
=======
  console.log(req.session);
  if (req.session.isPopulated) {
    res.render("urls_index", {
      username: req.session.user_id,
      urls: urls.getUrlsPerUser(req.session.user_id),
>>>>>>> feature/unique
      newUrl: null,
      publicUrl: PUBLIC_URL
    });
  } else {
    res.sendStatus(403);
    res.redirect("/login");
  }
});

app.post("/urls", (req, res) => {
<<<<<<< HEAD
  if (req.body.url != "") {
    urls.create(req.body.url, req.cookies['user_id']);
=======
  if (req.body.url != "" && !req.session.isChanged) {
    urls.create(req.body.url, req.session.user_id);
>>>>>>> feature/unique
  }
  res.redirect("/urls");
});

app.get("/urls/new", (req, res) => {
<<<<<<< HEAD
  if (req.cookies["user_id"]) {
    res.render("urls_index", {
      username: req.cookies["user_id"],
      urls: urls.getUrlsPerUser(req.cookies["user_id"]),
=======
  if (req.session.user_id) {
    res.render("urls_index", {
      username: req.session.user_id,
      urls: urls.getUrlsPerUser(req.session.user_id),
>>>>>>> feature/unique
      newUrl: "t",
      publicUrl: PUBLIC_URL
    });
  } else {
    res.sendStatus(403);
    res.redirect("/login");
  }
});

app.post("/urls/:id/delete", (req, res) => {
<<<<<<< HEAD
  users.removeUrl(req.cookies['user_id'], req.params.id);
=======
  if (users.hasUrl(req.session.user_id, req.params.id)) {
    users.removeUrl(req.session.user_id, req.params.id);
  } else {
    res.sendStatus(403);
  }
>>>>>>> feature/unique
  res.redirect("/urls");
});

app.get("/urls/:shortURL", (req, res) => {
<<<<<<< HEAD
  if (req.cookies["user_id"]) {
    let templateVars = {
      username: req.cookies["user_id"],
=======
  if (req.session.user_id && users.hasUrl(req.session.user_id, req.params.shortURL)) {
    let templateVars = {
      username: req.session.user_id,
>>>>>>> feature/unique
      shortURL: req.params.shortURL,
      longURL: urls.findUrl(req.params.shortURL)
    };
    res.render("urls_show", templateVars);
  } else {
    res.sendStatus(403);
    res.redirect("/login");
  }
});

app.post("/urls/:shortURL", (req, res) => {
  urls.update(req.params.shortURL, req.body.newURL);
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
