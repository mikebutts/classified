var express = require("express");
var router = express.Router();
const { postRegister, postLogin, getLogout } = require("../controllers");
const { asyncErrorHandler } = require("../middleware");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Rochester Garage Sales - Home" });
});

// ----------- REGISTER METHODS -------------
/* GET register page. */
router.get("/register", (req, res, next) => {
  res.send("GET /register");
});
/* POST  register page. */
router.post("/register", asyncErrorHandler(postRegister));

// ---------- LOGGING IN AND OUT METHODS -------------
/* GET login  page. */
router.get("/login", (req, res, next) => {
  res.send("GET /login");
});

/* POST  login  page. */
router.post("/login", postLogin);

// GET log out
router.get("/logout", getLogout);

/* GET profile page. */
router.get("/profile", (req, res, next) => {
  res.send("GET /profile");
});

/* POST  update profile page. */
router.put("/profile/:user_id", (req, res, next) => {
  res.render("PUT /profile/:user_id");
});

// GET forgot password
router.get("/forgot", (req, res, next) => {
  res.send("GET /forgot");
});

// PUT forgot password
router.put("/forgot", (req, res, next) => {
  res.send("PUT /forgot");
});

// GET reset password
router.get("/reset/:token", (req, res, next) => {
  res.send("GET /reset");
});

// PUT reset password
router.put("/reset/:token", (req, res, next) => {
  res.send("PUT /reset");
});
module.exports = router;
