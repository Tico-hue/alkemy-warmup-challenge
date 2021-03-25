const { Router } = require("express");
const {
  getAllposts,
  createPost,
  getPost,
} = require("../controllers/posts.controllers");
const router = Router();

router.get("/", getAllposts);
router.get("/:id", getPost);
router.post("/", createPost);
module.exports = router;
