const db = require("../models");
const Initiative = db.initiatives;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
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
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Campaign."
        });
      });
  };


exports.getAll = (req, res) => {
    Initiative.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

exports.getById = (req, res) => {
    const id = req.params.id;
  
    Initiative.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  }

exports.update = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Initiative.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Initiative with id=${id}. Maybe Initiative was not found!`
      });
    } else res.send({ message: "Initiative was updated successfully." });
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Initiative with id=" + id
    });
  });
}