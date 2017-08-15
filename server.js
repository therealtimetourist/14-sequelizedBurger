//require express, body-parser and method-override npms
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// determine if port is live or local
var port = process.env.PORT || 3000;
// create instance of express
var app = express();

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// use html interpreter from body-parser npm
//app.use(bodyParser.urlencoded({ extended: false }));

// override with POST having ?_method=DELETE
//app.use(methodOverride("_method"));

// Set Handlebars instance
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes
//var routes = require("./controllers/burger_controller.js");
// give server access to routes
//app.use("/", routes);
// port listener
//app.listen(port);

// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});