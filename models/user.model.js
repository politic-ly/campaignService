module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          _id: Number,
          fullName: String,
          email: String,
          location: String,
          profileImage: String,
          typeOfAccount: String,
          notfications: [String],
          favorites: [String], //Initiative IDs
          initiativesCreated: [String], //Initiative IDs
          eventsVolunteer: [String], //Event IDs
          eventsCreated: [String], //Event IDs
        }
      )
    );
  
    return User;
  };