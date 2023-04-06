var express = require("express");
var router = express.Router();
var multer = require("multer");
const initiatives = require("../controllers/initiatives.controller.js");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
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
router.post("/:id/announcement/new", initiatives.createAnnouncement);
// router.post(
//   "/:id/annnouncement/:announcementId",
//   initiatives.updateAnnouncement
// );
router.get(
  "/:id/announcement/:announcementId",
  initiatives.getAnnouncementById
);
router.get("/:id/announcements", initiatives.getAnnouncementsByInitiative);
router.post("/list/ids", initiatives.getInitiativesByIds);

module.exports = router;
