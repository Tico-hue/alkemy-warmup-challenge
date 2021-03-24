const { Router } = require("express");
const { getAllUsers } = require("../controllers/users.controllers");
const router = Router();

router.get("/", getAllUsers);
// router.post('/');
// router.put('/:id');
// router.patch('/:id');
// router.delete('/:id');

module.exports = router;
