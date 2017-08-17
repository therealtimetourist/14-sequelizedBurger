// require npm express
var express = require("express");
// router method of express npm
var router = express.Router();
// Import burger model to use its database functions.
var db = require("../models");
// Create routes/set up logic within routes
router.get("/", function(req, res) {
  // db.burger.all(function(data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
  //   console.log(hbsObject);
  //   // index.handlebars
  //   res.render("index", hbsObject);
  // });
  db.burgers.findAll({}).then(function(data){
    res.render("index",{burgers:data})
  });
});

router.post("/burgers/insertone", function(req, res) {
  //db.burgers.findAll({}).then(function(burgers) {
      // We have access to the todos as an argument inside of the callback function
    db.burgers.create({
      burger_name: req.burger_name,
      //complete: req.body.complete
    }).then(function(burger) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(burger);
    });
  //});
});

// update record
router.put("/:id", function(req, res) {
  // var condition = "id = " + req.params.id;

  // console.log("condition", condition);

  // Burger.update({
  //   devoured: req.body.devoured
  // }, condition, function() {
  //   res.redirect("/");
  // });
  db.burgers.update({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(burger) {
      res.json(burger);
    });

});

router.delete("/:id", function(req, res) {
  // var condition = "id = " + req.params.id;

  // Burger.delete(condition, function() {
  //   res.redirect("/");
  // });
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
