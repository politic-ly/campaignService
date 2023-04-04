var express = require("express");
var router = express.Router();
var multer = require("multer");
const initiatives = require("../controllers/initiatives.controller.js");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + extension);
  },
});
const upload = multer({ storage: storage });
/* GET users listing. */
router.post("/", upload.array("images"), initiatives.create);
router.get("/", initiatives.getAll);
router.get("/user/:id", initiatives.getByUser);
router.get("/:id", initiatives.getById);
router.put("/:id", initiatives.update);
router.post("/:id/event/new", initiatives.createEvent);
router.post("/:id/event/:eventId", initiatives.updateEvent);
router.get("/:id/event/:eventId", initiatives.getEventById);
router.get("/:id/event", initiatives.getEventsByInitiative);

module.exports = router;
