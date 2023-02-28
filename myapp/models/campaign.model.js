module.exports = mongoose => {
    const Campaign = mongoose.model(
      "campaign",
      mongoose.Schema(
        {
          title: String,
          description: String,
          createdBy: String
        }
      )
    );
  
    return Campaign;
  };