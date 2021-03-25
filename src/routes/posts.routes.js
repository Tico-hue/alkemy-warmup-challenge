const { Router } = require("express");
const {
  getAllposts,
  createPost,
  updatePost,
  getPost,
} = require("../controllers/posts.controllers");
const router = Router();

router.get("/", getAllposts);
router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);

module.exports = router;
