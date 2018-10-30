const express = require("express");
const app = express();
const bd = require("body-parser");
const PORT = 8080; // default port 8080

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

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/login", (req, res) => {
  res.render("urls_login");
});
app.post("/login", (req, res) => {
  res.send("Validating....");
});

app.get("/urls", (req, res) => {
  res.render("urls_index", {
    urls: urlDatabase
  });
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  generateRandomUrl(req.body.longURL);
  res.send("OK");
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = {
    shortURL: Object.keys(urlDatabase).find(el => el === req.params.shortURL),
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render("urls_show", templateVars);
});
app.post("/urls/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL] = req.body.newURL;
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
