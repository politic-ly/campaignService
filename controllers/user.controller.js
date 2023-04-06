const db = require("../models");
const axios = require("axios");
const User = db.users;

async function getGoogleUser(access_token) {
  let p2 = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    }
  );
  console.log(p2.data);
  return p2.data;
}

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  const access_token = req.params.access_token;
  let response = await getGoogleUser(access_token);
  // var start = new Date().getTime();
  //   while (new Date().getTime() < start + 5000);
  const id = response.id;
  // Find user by id and send data if user found
  console.log(id);
  var isUser = await User.exists({ _id: String(id) });

  // Create new User and save it in the database if the user does not already exist
  if (!isUser) {
    const user = new User(
      {
        _id: response.id,
        fullName: response.name,
        email: response.email,
        location: "Cincinnati, OH",
        profileImage: response.picture,
        typeOfAccount: "Citizen",
        notfications: req.body.notfications,
        favorites: req.body.favorites,
        initiativesCreated: req.body.initiativesCreated,
        eventsVolunteer: req.body.eventsVolunteer,
        eventsCreated: req.body.eventsCreated,
      },
      { _id: response.id }
    );

    user
      .save(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  } else {
    const existingUser = await User.findById(id).exec();
    res.send(existingUser);
  }
};

exports.findAll = (req, res) => {
  const name = req.query.firstName;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.findById2 = (req, res) => {
  const id = req.params.id;
  var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};

// Add a favorite initiative to a user
exports.addFavorite = (req, res) => {
  const id = req.params.id;
  const initiativeId = req.params.initiativeId;
  User.findByIdAndUpdate(
    id,
    { $push: { favorites: initiativeId } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Get all favorite initiatives for a user
exports.getFavorites = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data.favorites);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

exports.removeFavorite = (req, res) => {
  const id = req.params.id;
  const initiativeId = req.params.initiativeId;
  User.findByIdAndUpdate(
    id,
    { $pull: { favorites: initiativeId } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const user = req.body;
  User.findByIdAndUpdate(id, user, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
