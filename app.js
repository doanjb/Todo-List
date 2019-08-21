const express = require("express");
const path = require("path"); // for file paths
const mongoose = require("mongoose"); // mongoDB
const db = require("./config/keys").MongoURI; // database config
const passportSetup = require('./config/passport-setup');
const app = express();

const PORT = process.env.PORT || 5000;

// connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// body parser middleware
app.use(express.json()); // handles json data for post requests
app.use(express.urlencoded({ extended: false })); // handles url encoded data

// set up view engine
app.set('view engine', 'ejs');

// home route
app.use('/', require('./routes/index'));

// auth route
app.use('/auth', require('./routes/auth'));

// // sets public as the static folder
// app.use('/', express.static(path.join(__dirname, 'public')));

// // router to the API
// app.use("/", require("./routes/list"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));