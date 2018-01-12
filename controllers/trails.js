require('dotenv').config();
var express = require('express');
var request = require('request');
var geocoder = require('geocoder');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/', function(req, res){
  res.send('get /trails route');
});

router.post('/', function(req, res){
  console.log('post route', req.body.name);
    db.trail.findOrCreate({
      where: {name: req.body.name,
              city: req.body.city,
              state: req.body.state,
              description: req.body.description,
              directions: req.body.directions
            },
              defaults: {
                userId: req.user.id
      },
    }).spread(function(trail, wasCreated){
      res.redirect('/trails/wishlist');
    }).catch(function(err){
      console.log('error happened', err);
      res.send('error happened, see terminal');
    });
  });

  router.get('/wishlist', isLoggedIn, function(req, res) {
     db.user.findOne({
       where: {id: req.user.id},
       include: [db.trail]
     }).then(function(user){
       console.log("GIIIIIIIIIIt");
       res.render("trails/wishlist", {user: user});
       console.log(user);
     }).catch(function(err){
       console.log("my error is", + err);
     });
});

router.delete('/:id', function(req, res){
  console.log('delete route. ID = ', req.params.id);
  db.trail.destroy({
    where: { id: req.params.id}
  }).then(function(deleted){
    console.log('deleted = ', deleted);
    res.send('success');
  }).catch(function(err){
    console.log('error happened', err);
    res.send('fail');
  });
});

//Stetch goal routes
// router.get('/completed', function(req, res){
//   res.render('trails/completed');
// });
//
// router.get('/single', function(req, res){
//   res.render('trails/single');
// });

module.exports = router;
