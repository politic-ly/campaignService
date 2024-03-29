const db = require("../models");
const Initiative = db.initiatives;

const fs = require("fs");

const saveFile = (file, destination) => {
  const { path, filename } = file;

  const readStream = fs.createReadStream(path);
  const writeStream = fs.createWriteStream(`${destination}/${filename}`);

  readStream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      fs.unlink(path, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(filename);
        }
      });
    });

    writeStream.on("error", (err) => {
      reject(err);
    });
  });
};

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (req.files) {
    console.log(req.files);
    const fileNames = [];
    console.log(req.files);
    req.files.map((file) => {
      console.log(file);
      fileNames.push(file.filename);
    });
    req.body.images = fileNames;
    // req.files.map((file) => saveFile(file, "public/uploads"));
  }

  // Create a Tutorial
  const initiative = new Initiative({
    name: req.body.name,
    title: req.body.title,
    images: req.body.images,
    fullDescription: req.body.fullDescription,
    shortDescription: req.body.shortDescription,
    location: req.body.location,
    admins: req.body.admins,
    followers: req.body.followers,
    announcements: req.body.announcements,
    tags: req.body.tags,
    events: req.body.events,
  });

  // Save Tutorial in the database
  initiative
    .save(initiative)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Campaign.",
      });
    });
};

exports.getAll = (req, res) => {
  const count = req.query.count;
  var query;
  if (count) {
    query = Initiative.find().limit(parseInt(count));
  } else {
    query = Initiative.find();
  }
  query
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.getByUser = (req, res) => {
  const id = req.params.id;
  const count = req.query.count;
  var query;
  if (count) {
    query = Initiative.find({ admins: id }).limit(parseInt(count));
  } else {
    query = Initiative.find({ admins: id });
  }
  query
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Initiative with id " + id });
      } else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Initiative with id=" + id });
    });
};

exports.getById = (req, res) => {
  const id = req.params.id;

  Initiative.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Initiative.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Initiative with id=${id}. Maybe Initiative was not found!`,
        });
      } else res.send({ message: "Initiative was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Initiative with id=" + id,
      });
    });
};

exports.createEvent = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Initiative.findByIdAndUpdate(
    id,
    { $push: { events: req.body } },
    { useFindAndModify: false }
  )

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Initiative with id=${id}. Maybe Initiative was not found!`,
        });
      } else res.send({ message: "Initiative was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Initiative with id=" + id,
      });
    });
};

exports.updateEvent = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  const eventId = req.params.eventId;
  Initiative.findOneAndUpdate(
    { _id: id, "events._id": eventId },
    { $set: { "events.$": req.body } },
    { useFindAndModify: false }
  )

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Initiative with id=${id}. Maybe Initiative was not found!`,
        });
      } else res.send({ message: "Initiative was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Initiative with id=" + id,
      });
    });
};

exports.getEventById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  const eventId = req.params.eventId;
  Initiative.find({ _id: id, "events._id": eventId })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Event with id " + eventId });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Event with id=" + eventId });
    });
};

exports.getEventsByInitiative = (req, res) => {
  const id = req.params.id;
  Initiative.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data.events);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

exports.getInitiativesByIds = (req, res) => {
  const ids = req.body.ids;
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Ids cannot be empty!",
    });
  }

  Initiative.find({ _id: { $in: ids } })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Initiative with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Initiative with id=" + id });
    });
};

exports.createAnnouncement = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Initiative.findByIdAndUpdate(
    id,
    { $push: { announcements: req.body } },
    { useFindAndModify: false }
  )

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Initiative with id=${id}. Maybe Initiative was not found!`,
        });
      } else res.send({ message: "Initiative was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Initiative with id=" + id,
      });
    });
};

exports.getAnnouncementsByInitiative = (req, res) => {
  const id = req.params.id;
  Initiative.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Initiative with id " + id });
      else res.send(data.announcements);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

exports.getAnnouncementById = (req, res) => {
  const id = req.params.id;
  const announcementId = req.params.announcementId;
  Initiative.find({ _id: id, "announcements._id": announcementId })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({
            message: "Not found Announcement with id " + announcementId,
          });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: "Error retrieving Announcement with id=" + announcementId,
        });
    });
};
