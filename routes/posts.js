var express = require("express");
var router = express.Router();

/* GET post page. */
router.get("/", (req, res, next) => {
  res.send("/posts");
});

router.get("/new", (req, res, next) => {
  res.send("/posts/new");
});

router.post("/", (req, res, next) => {
  res.send("CREATE /posts");
});

router.get("/:id", (req, res, next) => {
  res.send("SHOW /posts/:id");
});

router.get("/:id/edit", (req, res, next) => {
  res.send("EDIT /posts/:id/edit");
});

router.get("/:id", (req, res, next) => {
  res.send("UPDATE /posts/:id");
});

router.get("/:id", (req, res, next) => {
  res.send("DELETE /posts/:id");
});

module.exports = router;
