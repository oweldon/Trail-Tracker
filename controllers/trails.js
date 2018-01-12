require('dotenv').config();
var express = require('express');
var request = require('request');
var geocoder = require('geocoder');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res){
  res.send('get /trails route');
});

router.post('/', function(req, res){
  console.log('post route', req.body.name);
    db.trail.findOrCreate({
      where: {name: req.body.name},
      defaults: {
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        directions: req.body.directions
      }
    }).spread(function(trail, wasCreated){
      res.redirect('/trails/wishlist');
    }).catch(function(err){
      console.log('error happened', err);
      res.send('error happened, see terminal');
    });
  });

  router.get('/', function(req, res) {
     db.trail.findAll().then(function(wishlist){
       res.render('trails/wishlist', {wishlist: wishlist});
     });
});

router.get('/completed', function(req, res){
  res.render('trails/completed');
});

router.get('/single', function(req, res){
  res.render('trails/single');
});

module.exports = router;
