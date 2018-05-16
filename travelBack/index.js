/*
 * VARIABLES
 */
var express = require("express");
var mongoose = require("mongoose");
var morgan = require('morgan')

//Host-variables
var hostname = "localhost";
var port = 3400;

//Using express
const app = express();
app.use(morgan('combined'))

var options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

//URL of our SDGB
var urlmongo =
  "mongodb://spinachmerciful:platypus@ds237868.mlab.com:37868/travelbook";

//Connecting it
mongoose.connect(urlmongo, options);
const bodyParser = require("body-parser");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Starting the server
app.listen(port, hostname, function() {
  console.log("Travel book ! sur http://" + hostname + ":" + port + "\n");
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-access-token, Content-Type, authorization, Authorization, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

//Include our own routes (ex /home, /users...)
var routes = require("./routes/router");

app.use("/", routes);

module.exports = app;
// error handler
/*app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});*/
