const express = require("express");
const app = express();
const bd = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const { urls, users } = require("./dbs/db_crud");
const register = require("./routes/register");
const login = require("./routes/login");
const redirect = require('./routes/short-redirects');
const PORT = process.env.PORT || 5000; // default port 8080
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:" + PORT;

//Admin Password 'root'

app.use(bd.json());
app.use(bd.urlencoded({ extended: true }));
app.use(cookieParser());

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
  res.clearCookie("user_id");
  res.redirect("/login");
});

app.get("/urls", (req, res) => {
  if (req.cookies["user_id"]) {
    res.render("urls_index", {
      username: req.cookies["user_id"],
      urls: urls.getUrlsPerUser(req.cookies["user_id"]),
      newUrl: null,
      publicUrl: PUBLIC_URL
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/urls", (req, res) => {
  if (req.body.url != "") {
    urls.create(req.body.url, req.cookies['user_id']);
  }
  res.redirect("/urls");
});

app.get("/urls/new", (req, res) => {
  if (req.cookies["user_id"]) {
    res.render("urls_index", {
      username: req.cookies["user_id"],
      urls: urls.getUrlsPerUser(req.cookies["user_id"]),
      newUrl: "t",
      publicUrl: PUBLIC_URL
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/urls/:id/delete", (req, res) => {
  users.removeUrl(req.cookies['user_id'], req.params.id);
  res.redirect("/urls");
});

app.get("/urls/:shortURL", (req, res) => {
  if (req.cookies["user_id"]) {
    let templateVars = {
      username: req.cookies["user_id"],
      shortURL: req.params.shortURL,
      longURL: urls.findUrl(req.params.shortURL)
    };
    res.render("urls_show", templateVars);
  } else {
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
