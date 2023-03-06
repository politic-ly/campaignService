require("dotenv").config();
const dbUser = process.env.dbUser;
const dbPassword = process.env.dbPassword;
const dbDatabase = process.env.dbDatabase;
const dbUrl = process.env.dbUrl;
module.exports = {
   url: process.env.dbUrl || `mongodb+srv://${dbUser}:${dbPassword}@${dbDatabase}/db1?retryWrites=true&w=majority`
  };