module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          fullName: String,
          email: String,
          location: String,
          profileImage: String,
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