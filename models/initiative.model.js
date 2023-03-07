module.exports = mongoose => {
    const Initiative = mongoose.model(
      "initiative",
      mongoose.Schema(
        {
          name: String,
          title: String,
          images: [String],
          fullDescription: String,
          shortDescription: String,
          location: String,
          admins: [String], //User IDs
          followers: [String], //User IDs
          announcements: [String], //Announcement IDs
          tags: [String],
          events: [String], //Event IDs
        }
      )
    );
  
    return Initiative;
  };