require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const engine = require("ejs-mate");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const reviewsRouter = require("./routes/reviews");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/user");
const methodOverride = require("method-override");

const app = express();

//setup database connection
mongoose.connect(
  "mongodb+srv://ilovergs:baIPS8LQL3eZVqld@cluster0-j2gj5.mongodb.net/RGS",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(" DB connected");
});

// view engine setup
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("ppublic"));
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// configure Passport and Sessions
app.use(
  session({
    secret: "i love rochester",
    resave: false,
    saveUninitialized: true,
  })
);

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/posts/:id/reviews", reviewsRouter);

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

module.exports = app;
