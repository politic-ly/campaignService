const db = require("../models");
const Campaign = db.campaigns;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Tutorial
    const campaign = new Campaign({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.body.createdBy
    });
  
    // Save Tutorial in the database
    campaign
      .save(campaign)
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
