const { Router } = require("express");
const {
  getAllposts,
  getPost,
} = require("../controllers/posts.controllers");
const router = Router();
router.get("/", getAllposts);
router.get("/:id", getPost);
module.exports = router;
