const express = require("express");
const app = express();
const bd = require("body-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const { urls, users } = require("./dbs/db_crud");
const register = require("./routes/register");
const login = require("./routes/login");
const url = require("./routes/urls");
const methodOverride = require("method-override");
require("dotenv").config();
const redirect = require("./routes/short-redirects");
const PORT = process.env.PORT || 5000; // default port 5000
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:" + PORT;
const COOKIE_KEY = process.env.COOKIE_KEY;

app.use(bd.json());
app.use(bd.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: [COOKIE_KEY]
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("urls_landing");
});
app.use("/go", redirect);
app.use("/register", register);
app.use("/login", login);
app.use("/urls", url);

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
