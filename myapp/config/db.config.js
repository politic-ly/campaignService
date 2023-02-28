require("dotenv").config();
const dbUser = process.env.dbUser;
const dbPassword = process.env.dbPassword;
const dbDatabase = process.env.dbDatabase;
module.exports = {
   url:`mongodb+srv://${dbUser}:${dbPassword}@${dbDatabase}/test`
  };