const { Router } = require("express");
const {
  getAllCategories,
  getCategory,
} = require("../controllers/categories.controllers");
const router = Router();
router.get("/", getAllCategories);
router.get("/:id", getCategory);
module.exports = router;
