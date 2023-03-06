var express = require('express');
var router = express.Router();
const user = require("../controllers/user.controller.js");
/* GET users listing. */
router.post('/:access_token', user.create);
router.get('/', user.findAll);
router.get('/:id', user.findOne);

module.exports = router;
