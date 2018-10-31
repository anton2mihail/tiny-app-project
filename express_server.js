const express = require("express");
const app = express();
const bd = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const { urls, users } = require("./dbs/db_crud");
const register = require("./routes/register");
const login = require("./routes/login");
const PORT = process.env.PORT || 5000; // default port 8080

app.use(bd.json());
app.use(bd.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.use("/register", register);
app.use("/login", login);

app.get("/login", (req, res) => {
  res.render("urls_login", {
    username: req.cookies["username"]
  });
});
app.post("/login", (req, res) => {
  if (users.isUser(req.body.username)) {
    res.cookie("username", req.body.username);
    res.redirect("/urls");
  } else {
    res.redirect("/register");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/login");
});

app.get("/urls", (req, res) => {
  if (req.cookies["username"]) {
    res.render("urls_index", {
      username: req.cookies["username"],
      urls: urls.all(),
      newUrl: null
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/urls", (req, res) => {
  if (req.body.url != "") {
    urls.create(req.body.url);
  }
  res.redirect("/urls");
});

app.get("/urls/new", (req, res) => {
  if (req.cookies["username"]) {
    res.render("urls_index", {
      username: req.cookies["username"],
      urls: urls.all(),
      newUrl: "t"
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/urls/:id/delete", (req, res) => {
  urls.remove(req.params.id);
  res.redirect("/urls");
});

app.get("/urls/:shortURL", (req, res) => {
  if (req.cookies["username"]) {
    let templateVars = {
      username: req.cookies["username"],
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
