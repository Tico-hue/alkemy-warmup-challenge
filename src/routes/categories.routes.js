const { Router } = require("express");
const {
  getAllCategories,
  createCategory,
  getCategory,
} = require("../controllers/categories.controllers");
const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);

module.exports = router;
