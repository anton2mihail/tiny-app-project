const express = require("express");
const router = express.Router();
const { urls, users } = require("../dbs/db_crud");

router.get("/:id", (req, res) => {
  let redirect = urls.findUrl(req.params.id);
  res.redirect(redirect);
});

module.exports = router;
