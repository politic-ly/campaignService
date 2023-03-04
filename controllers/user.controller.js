const db = require("../models");
const User = db.users;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Tutorial
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      location: req.body.location,
      profileImage: req.body.profileImage,
      typeOfAccount: req.body.typeOfAccount,
      notfications: req.body.notfications,
      favorites: req.body.favorites,
      initiativesCreated: req.body.initiativesCreated,
      eventsVolunteer: req.body.eventsVolunteer,
      eventsCreated: req.body.eventsCreated,
    });
  
    // Save Tutorial in the database
    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });

  exports.findAll = (req, res) => {
        const name = req.query.firstName;
        var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
      
        User.find(condition)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Users."
            });
          });
      };
    
    
    exports.findById2 = (req,res) =>{
        const id = req.params.id;
        var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
    
        User.find(condition)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving user."
          });
        });
      }
    
    // Find a single Tutorial with an id
    exports.findOne = (req, res) => {
        const id = req.params.id;
      
        Professor.findById(id)
          .then(data => {
            if (!data)
              res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
          })
          .catch(err => {
            res
              .status(500)
              .send({ message: "Error retrieving User with id=" + id });
          });
      };
    
    // Update a User by the id in the request
    exports.update = (req, res) => {
        if (!req.body) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
      
        const id = req.params.id;
      
        User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update User with id=${id}. Maybe User was not found!`
              });
            } else res.send({ message: "User was updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating User with id=" + id
            });
          });
      };
    
    // Delete a Tutorial with the specified id in the request
    exports.delete = (req, res) => {
      
    };
    
    // Delete all Tutorials from the database.
    exports.deleteAll = (req, res) => {
      
    };
    
    // Find all published Tutorials
    exports.findAllPublished = (req, res) => {
      
    };
  };
