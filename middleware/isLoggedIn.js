module.exports = function(req, res, next){
  if(!req.user){
    req.flash('error', "Login To Start Exploring!");
    res.redirect('/auth/login');
  }
  else{
    next();
  }
}
