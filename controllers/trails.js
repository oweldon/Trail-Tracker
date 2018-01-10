require('dotenv').config();
var bodyParser  = require('body-parser');
var express = require('express');
var router = express.Router();
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var session = require('express-session');
var geocoder = require('geocoder')
var app = express();



router.get('/completed', function(req, res){
  res.render('trails/completed');
});

router.get('/wishlist', function(req, res){
  res.render('trails/wishlist');
});

module.exports = router;
