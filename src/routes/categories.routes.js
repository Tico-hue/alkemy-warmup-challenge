const { Router } = require("express");
const {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
} = require("../controllers/categories.controllers");
const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.patch("/:id", updateCategory);

module.exports = router;
