var express = require('express');
var router = express.Router();
const campaign = require("../controllers/campaign.controller.js");
/* GET users listing. */
router.post('/', campaign.create);

module.exports = router;
