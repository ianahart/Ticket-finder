const helmet = require("helmet");
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const indexRoutes = require("./routes/indexRoutes");
require('./db/mongoose');
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(function (req, res, next) {
  res.locals.error_message = req.flash("error_message");
  next();
});

app.set("view engine", "ejs");

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT + "..."));
