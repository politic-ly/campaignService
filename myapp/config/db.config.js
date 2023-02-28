require("dotenv").config();
const dbUser = process.env.dbUser;
const dbPassword = process.env.dbPassword;
const dbDatabase = process.env.dbDatabase;
module.exports = {
    // url: "mongodb://localhost:27017/local"
  // url:"mongodb+srv://politicly:sussymilk123@cluster0.fh6w19h.mongodb.net/test"
   url:`mongodb+srv://${dbUser}:${dbPassword}@${dbDatabase}/test`
  };