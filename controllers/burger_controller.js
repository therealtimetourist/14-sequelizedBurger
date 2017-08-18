// require npm express
var express = require("express");
// router method of express npm
var router = express.Router();
// Import burger model to use its database functions.
var db = require("../models");
// Create routes/set up logic within routes
router.get("/", function(req, res) {
  db.burgers.findAll({}).then(function(data){
    res.render("index",{burgers:data})
  });
});

router.post("/", function(req, res) {
  // We have access to the todos as an argument inside of the callback function
  db.burgers.create({
    burger_name: req.body.burger_name,
    devoured: req.body.devoured
  }).then(function(burger) {
    // We have access to the new todo as an argument inside of the callback function
    res.json(burger);
  });
  res.redirect("/");
});

// PUT route for updating todos. We can get the updated todo data from req.body
router.post("/api/:id", function(req, res) {
// Update takes in an object describing the properties we want to update, and
// we use where to describe which objects we want to update

  db.burgers.findOne({
    where:{
      id: req.params.id
    }
  }).then(function(burger){
    db.burgers.update({
     burger_name: burger.burger_name,
     devoured: req.body.devoured
    },
    {
      where: {
        id: req.params.id
      }
    }).then(function(burger) {
      res.json(burger);
    });
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
  db.burgers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(burger) {
      res.json(burger);
    });
});

// Export routes for server.js to use.
module.exports = router;
