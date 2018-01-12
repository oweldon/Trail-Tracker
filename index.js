require('dotenv').config();
var bodyParser  = require('body-parser');
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var passport = require('./config/passportConfig');
var session = require('express-session');
var geocoder = require('geocoder')
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.render('home');
});

app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile', {});
});

app.post('/coords', function(req, res){
  //res.send(req.body);
  console.log(req.body);
  var hikeUrl = "https://trailapi-trailapi.p.mashape.com/?lat="+req.body.lat+"&limit=25&lon="+req.body.lng+"&q[activities_activity_type_name_eq]=hiking&caving&radius=10";
  hikeUrl += "&";

  request({
    headers: {
      "X-Mashape-Key": process.env.TRAIL_KEY,
      "Accept": "text/plain"
    },
    uri: hikeUrl
  }, function(error, response, body){
    var hikes = JSON.parse(body);
    console.log(hikes);
    res.send(hikes);
  });
});


app.use('/auth', require('./controllers/auth'));
app.use('/trails', require('./controllers/trails'));

app.listen(process.env.PORT || 3000);
