const mongoose = require("mongoose");
const { Schema } = mongoose;
module.exports = (mongoose) => {
  const Event = new Schema({
    title: String,
    description: String,
    date: Date,
    volunteers: [String],
  });

  const Announcement = new Schema({
    title: String,
    description: String,
  });

  const Initiative = mongoose.model(
    "initiative",
    mongoose.Schema({
      name: String,
      title: String,
      images: [String],
      fullDescription: String,
      shortDescription: String,
      location: String,
      admins: [String], //User IDs
      followers: [String], //User IDs
      announcements: [Announcement], //Announcement IDs
      tags: [String],
      events: [Event], //Event IDs
    })
  );

  return Initiative;
};
