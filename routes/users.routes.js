var express = require("express");
var router = express.Router();
const user = require("../controllers/user.controller.js");
/* GET users listing. */
router.post("/:access_token", user.create);
router.post("/:id", user.update);
router.get("/", user.findAll);
router.get("/:id", user.findOne);
router.post("/:id/favorite/:initiativeId", user.addFavorite);
router.delete("/:id/favorite/:initiativeId", user.removeFavorite);
router.get("/:id/favorite", user.getFavorites);

module.exports = router;
