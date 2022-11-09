var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
const {
  authentication,
  loginCallback,
  getUserInfos,
} = require("./controller/login.controller");
const config = require("./config");
const { logout, localLogout } = require("./controller/logout.controller");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "personnal_secret",
    tokens: {},
    user: {},
    saveUninitialized: true,
    resave: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.data = req.session.data;
  next();
});

app.use("/", indexRouter);
app.use("/user", getUserInfos);
app.post("/login", authentication);
app.get("/login-callback", loginCallback);
app.post("/logout", logout);
app.get("/logout-callback", localLogout);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const URL = config.FS_URL;
app.listen(() => {
  console.log(`Server listening on : ${URL}`);
});

module.exports = app;
