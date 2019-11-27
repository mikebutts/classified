var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { asyncErrorHandler } = require("../middleware");
const {
  postIndex,
  postNew,
  postShow,
  postEdit,
  postCreate,
  postUpdate,
  postDestroy
} = require("../controllers/posts");

/* GET index post page. */
router.get("/", asyncErrorHandler(postIndex));

/* GET new post   /posts/new page. */
router.get("/new", postNew);

/* POST posts create /posts */
router.post("/", upload.array("images", 6), asyncErrorHandler(postCreate));

/* GET show page */
router.get("/:id", asyncErrorHandler(postShow));

router.get("/:id/edit", asyncErrorHandler(postEdit));

router.put("/:id", upload.array("images", 4), asyncErrorHandler(postUpdate));

router.delete("/:id", asyncErrorHandler(postDestroy));

module.exports = router;
