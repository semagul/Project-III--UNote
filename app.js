const cors = require('cors')
const packageJson = require("./package.json")

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

//  check if file dir for exists if not create

const fs = require('fs')
let dir = `${packageJson.blobStoreDir}`

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
// ℹ️ Needed to accept from requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request if from the same domain, by default express wont accept POST requests
app.use(cors())


// Todo : Enables the XML form
// app.use('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()
//   });

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const { isAuthenticated } = require('./middleware/jwt')

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js


const auth = require("./routes/auth")
app.use("/api/auth", auth);

const notes = require("./routes/notes")
app.use("/api", isAuthenticated, notes);

const events = require("./routes/events")
app.use("/api", isAuthenticated, events);

const audios = require("./routes/audios")
app.use("/api", isAuthenticated, audios);

const bloburl = require("./routes/bloburl")
app.use("/api", isAuthenticated, bloburl);

const everyItem = require("./routes/index")
app.use("/api", isAuthenticated, everyItem);

const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")))

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);


module.exports = app;
