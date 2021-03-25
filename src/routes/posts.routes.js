const { Router } = require("express");
const {
  getAllposts,
  createPost,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/posts.controllers");
const router = Router();

router.get("/", getAllposts);
router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
