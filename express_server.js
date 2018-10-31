const express = require("express");
const app = express();
const bd = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = 80; // default port 8080

let urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const generateRandomUrl = params => {
  let r = Math.random()
    .toString(36)
    .substring(1, 6);
  urlDatabase[r] = params;
};

app.use(bd.json());
app.use(bd.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/login", (req, res) => {
  res.render("urls_login", {
    username: req.cookies["username"]
  });
});
app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/login");
});

app.get("/urls", (req, res) => {
  if (req.cookies["username"]) {
    res.render("urls_index", {
      username: req.cookies["username"],
      urls: urlDatabase,
      newUrl: null
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/urls/new", (req, res) => {
  if (req.cookies["username"]) {
    res.render("urls_index", {
      username: req.cookies["username"],
      urls: urlDatabase,
      newUrl: "t"
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/urls", (req, res) => {
  if (req.body.longURL != "") {
    generateRandomUrl(req.body.longURL);
  }
  res.redirect("/urls");
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});

app.get("/urls/:shortURL", (req, res) => {
  if (req.cookies["username"]) {
    let templateVars = {
      username: req.cookies["username"],
      shortURL: Object.keys(urlDatabase).find(el => el === req.params.shortURL),
      longURL: urlDatabase[req.params.shortURL]
    };
    res.render("urls_show", templateVars);
  } else {
    res.redirect("/login");
  }
});

app.post("/urls/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL] = req.body.newURL;
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
