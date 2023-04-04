module.exports = (mongoose) => {
  const Event = mongoose.model(
    "event",
    mongoose.Schema({
        title: String,
        description: String,
        date: Date,
        volunteers: [String],
        initiative: String,
    })
  );

  return Event;
};

// ID
// Title
// Description
// Date
// Volunteers[]: <userId>
// Initiative belonged to: <initiativeId>
