var express = require('express');
var router = express.Router();
const initiatives = require("../controllers/initiatives.controller.js");
/* GET users listing. */
router.post('/', initiatives.create);
router.get('/', initiatives.getAll);
router.get('/:id', initiatives.getById);
router.put('/:id', initiatives.update);

module.exports = router;
