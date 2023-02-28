var express = require('express');
var router = express.Router();
const user = require("../controllers/user.controller.js");
/* GET users listing. */
router.post('/', user.create);

module.exports = router;
