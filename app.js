var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var multer = require("multer");

const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

var app = express();
app.use(express.static("public"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const fs = require("fs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
require("dotenv").config();
const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

var corsOptions = {
  origin: process.env.corsOrigin,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.options("*", cors());
app.use(cors(corsOptions));

var indexRouter = require("./routes/index.routes");
var usersRouter = require("./routes/users.routes");
var loginRouter = require("./routes/login.routes");
var initiativesRouter = require("./routes/initiatives.routes");
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/initiatives", initiativesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(express.json());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const PORT = process.env.PORT || 5152;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
