const express = require("express");
const app = express();
// Helps with parsing the body of http requests
const bd = require("body-parser");
//Makes all cookies session cookies, so that they are destroyed on tab close
const cookieSession = require("cookie-session");
const path = require("path");
// The register route
const register = require("./routes/register");
// Login route
const login = require("./routes/login");
// The routes for the urls endpoint
const url = require("./routes/urls");
// Allows for the creation of PUT and DELETE event handlers
const methodOverride = require("method-override");
// Setup of environment variables
require("dotenv").config();
// Route for the use of the short url redirects
const redirect = require("./routes/short-redirects");
const PORT = process.env.PORT || 5000; // default port 5000
const COOKIE_KEY = process.env.COOKIE_KEY || 'Key Random';

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
  res.redirect("/login");
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
