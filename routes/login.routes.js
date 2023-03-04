var express = require('express');
var router = express.Router();
const login = require("../controllers/login.controller.js");
/* GET users listing. */
router.get('/', login.create);

module.exports = router;
